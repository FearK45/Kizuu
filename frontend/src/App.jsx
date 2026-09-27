import { useEffect, useState } from 'react';
import { calculateCompatibility, SUPPORTED_MODES } from './utils/compatibility';
import { supabase } from './supabaseClient';

const MODE_LABELS = {
  FRIENDSHIP: '🤝 Friendship',
  CRUSH: 'Crush',
  GF: '💕 Girlfriend (GF)',
  BF: '💕 Boyfriend (BF)',
  WIFE: 'Wife',
  HUSBAND: 'Husband',
  EX: '💔 Ex',
};

const MODE_EMOJI = {
  FRIENDSHIP: '🤝',
  CRUSH: '❤️',
  GF: '💕',
  BF: '💕',
  WIFE: '💍',
  HUSBAND: '💍',
  EX: '💔',
};

const scoreNarrative = (score) => {
  if (score >= 90) return 'Very Strong Connection';
  if (score >= 75) return 'Strong Duo Energy';
  if (score >= 60) return 'Good Vibe';
  if (score >= 40) return 'Interesting Connection';
  return 'Friendship Zone';
};

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Math.max(0, Math.min(100, Math.round(value)));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target);
      return undefined;
    }

    let startTime;
    let animationFrame;
    const duration = 850;
    const countUp = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - ((1 - progress) ** 3);
      setDisplayValue(Math.round(target * easedProgress));
      if (progress < 1) animationFrame = requestAnimationFrame(countUp);
    };

    animationFrame = requestAnimationFrame(countUp);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return `${displayValue}%`;
}

const calculateLocalMatch = (name1, name2, mode = 'friendship') => {
  const normalize = (value = '') => String(value)
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();

  const firstName = normalize(name1);
  const secondName = normalize(name2);

  if (!firstName || !secondName) {
    throw new Error('Please enter both names.');
  }

  const getUniqueLetters = (name) => [...new Set(name.replace(/\s+/g, '').split(''))].filter(Boolean);
  const getCommonItems = (arr1, arr2) => {
    const set2 = new Set(arr2);
    return arr1.filter((item) => set2.has(item));
  };

  const getPatternScore = (a, b) => {
    const combined = `${a}${b}`;
    const vowels = [...combined].filter((ch) => 'aeiou'.includes(ch)).length;
    const consonants = [...combined].filter((ch) => /[a-z]/.test(ch) && !'aeiou'.includes(ch)).length;
    const vowelRatio = vowels / Math.max(vowels + consonants, 1);
    const symmetry = 100 - Math.abs(a.length - b.length) * 3;
    const repetition = combined.split('').reduce((count, ch) => count + (combined.split(ch).length - 1 > 0 ? 1 : 0), 0);
    return Math.max(0, Math.min(100, Math.round((vowelRatio * 45) + (symmetry * 0.35) + (repetition % 10) * 2)));
  };

  const firstLetters = getUniqueLetters(firstName);
  const secondLetters = getUniqueLetters(secondName);
  const uniqueUnion = [...new Set([...firstLetters, ...secondLetters])];
  const commonLetters = getCommonItems(firstLetters, secondLetters);

  const letterMatch = uniqueUnion.length ? (commonLetters.length / uniqueUnion.length) * 100 : 0;
  const structureDifference = Math.abs(firstName.length - secondName.length);
  const structureScore = Math.max(0, 100 - (structureDifference / Math.max(firstName.length, secondName.length, 1)) * 100);
  const commonCount = commonLetters.length;
  const totalUnique = Math.max(firstLetters.length + secondLetters.length - commonCount, 1);
  const sharedCharacterScore = (commonCount / totalUnique) * 100;
  const patternScore = getPatternScore(firstName, secondName);

  const weighted = letterMatch * 0.4 + structureScore * 0.2 + sharedCharacterScore * 0.2 + patternScore * 0.2;
  let score = Math.round(Math.max(0, Math.min(100, weighted)));

  if (mode === 'romantic') {
    score = Math.min(100, score + 4);
  }

  return {
    score,
    report: mode === 'friendship'
      ? {
          title: 'FRIENDSHIP MATCH',
          headline: score >= 85 ? 'Great friend energy!' : score >= 65 ? 'A fun and steady friendship vibe!' : score >= 40 ? 'There’s a nice spark here!' : 'A playful friendship pairing!',
          categories: {
            'Friendship vibe': Math.min(99, score + 5),
            Communication: Math.min(99, score - 2),
            'Fun & energy': Math.min(99, score + 8),
            'Trust & support': Math.min(99, score - 5),
            'Name pattern': Math.min(99, score + 3),
          },
        }
      : {
          title: 'ROMANTIC MATCH',
          headline: score >= 85 ? 'A lovely connection!' : score >= 65 ? 'A sweet romantic vibe!' : score >= 40 ? 'An interesting spark!' : 'A playful romantic match!',
          categories: {
            'Emotional connection': Math.min(99, score - 1),
            Chemistry: Math.min(99, score + 5),
            'Attraction / vibe': Math.min(99, score + 2),
            Communication: Math.min(99, score - 3),
            'Fun & playfulness': Math.min(99, score + 7),
          },
        },
  };
};

function App() {
  const [matchMode, setMatchMode] = useState('FRIENDSHIP');
  const [romanticMode, setRomanticMode] = useState('CRUSH');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const mode = matchMode === 'FRIENDSHIP' ? 'FRIENDSHIP' : romanticMode;

  const handleCalculate = () => {
    const cleanName1 = name1.trim();
    const cleanName2 = name2.trim();

    if (!cleanName1 || !cleanName2) {
      setError('Please enter both names, friend.');
      return;
    }

    if (cleanName1.length < 2 || cleanName2.length < 2) {
      setError('Names must be at least 2 letters long.');
      return;
    }

    const sanitizedName1 = cleanName1.replace(/[<>]/g, '').trim();
    const sanitizedName2 = cleanName2.replace(/[<>]/g, '').trim();

    if (!sanitizedName1 || !sanitizedName2) {
      setError('Please use normal letters and spaces only.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(async () => {
      try {
        const compatibility = calculateCompatibility(sanitizedName1, sanitizedName2, mode);
        setResult(compatibility);

        const matchRow = {
          name1: sanitizedName1,
          name2: sanitizedName2,
          match_mode: matchMode,
          romantic_mode: matchMode === 'ROMANTIC' ? romanticMode : null,
          score: compatibility.score,
        };

        if (!supabase) {
          console.error('Supabase insert skipped: fill in VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local.');
          return;
        }

        try {
          const { error: insertError } = await supabase.from('matches').insert(matchRow);
          if (insertError) console.error('Supabase insert failed:', insertError);
        } catch (insertError) {
          console.error('Supabase insert failed:', insertError);
        }
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const resetForm = () => {
    setResult(null);
    setError('');
    setName1('');
    setName2('');
    setMatchMode('FRIENDSHIP');
    setRomanticMode('CRUSH');
  };

  return (
    <div className="page-shell">
      <header className="hero-header">
        <div className="header-topline"><span className="brand-mark">✿</span> DUO VIBE CHECK</div>
        <h1>A little game for your <span>favorite people "kizuu"</span></h1>
        <p>Pick your people. Make a little prediction. 🎈</p>
        <div className="mini-note">Just for fun. It’s a name game, not a real compatibility score.</div>
      </header>

      <main className="main-content">
        <aside className="sidebar-box">
          <span className="eyebrow">A LITTLE GAME FOR EVERY DUO</span>
          <h3>Who’s playing?</h3>
          <p>Best friends, siblings, parents, cousins, or your favorite fictional duo. Pick a pair and see what the names have to say.</p>
          <div className="example-pills"><span>✨ Besties</span><span>🏡 Family</span><span>🎬 Fictional duos</span></div>
        </aside>

        <section className="calculator-box">
          <div className="section-kicker">💌 CHOOSE YOUR MATCH <span>✨ ADD TWO NAMES</span></div>
          <div className="match-mode-switch" role="radiogroup" aria-label="Choose friendship or romantic mode">
            <label className={matchMode === 'FRIENDSHIP' ? 'mode-choice selected' : 'mode-choice'}>
              <input type="radio" name="match-mode" checked={matchMode === 'FRIENDSHIP'} onChange={() => setMatchMode('FRIENDSHIP')} />
              <span>🤝 Friendship</span>
            </label>
            <label className={matchMode === 'ROMANTIC' ? 'mode-choice selected' : 'mode-choice'}>
              <input type="radio" name="match-mode" checked={matchMode === 'ROMANTIC'} onChange={() => setMatchMode('ROMANTIC')} />
              <span>❤️ Match Mode</span>
            </label>
          </div>
          {matchMode === 'ROMANTIC' && (
            <div className="form-row romantic-subtype-row">
              <label htmlFor="relationship-mode">💕 Choose romantic match</label>
              <select id="relationship-mode" value={romanticMode} onChange={(e) => setRomanticMode(e.target.value)}>
                {SUPPORTED_MODES.filter((option) => option !== 'FRIENDSHIP').map((option) => (
                  <option key={option} value={option}>{MODE_EMOJI[option]} {MODE_LABELS[option].replace(/^[^ ]+ /, '')}</option>
                ))}
              </select>
            </div>
          )}
          <div className="form-row">
            <label htmlFor="name-one">🙋 First Person name</label>
            <input id="name-one" value={name1} onChange={(e) => setName1(e.target.value)} placeholder="e.g. Sam" maxLength={32} autoComplete="off" />
          </div>

          <div className="form-row">
            <label htmlFor="name-two">✨ Second Person name</label>
            <input id="name-two" value={name2} onChange={(e) => setName2(e.target.value)} placeholder="e.g. Alexa" maxLength={32} autoComplete="off" />
          </div>

          <div className="versus-mark" aria-hidden="true">💫 VS 💫</div>

          {error && <div className="error-box">{error}</div>}

          <button className={`calculate-btn ${mode === 'FRIENDSHIP' ? 'friendship-btn' : ''}`} onClick={handleCalculate} disabled={loading} aria-busy={loading}>
            {loading
              ? <><span className="loading-spinner" aria-hidden="true" />Calculating your score...</>
              : `${MODE_EMOJI[mode]} Calculate ${MODE_LABELS[mode].replace(/^[^ ]+ /, '')} match`}
          </button>

          {result && (
            <div className="result-box">
              <div className="result-header">
                <h2>{MODE_EMOJI[result.mode]} {result.title}</h2>
                <div className="score-badge"><AnimatedNumber value={result.score} /></div>
              </div>

              <p className="headline">✨ {result.message}</p>
              <p className="score-band">{scoreNarrative(result.score)}</p>
              <p className="summary">{result.person1} + {result.person2} · {MODE_LABELS[result.mode]}</p>

              <div className="category-grid">
                {Object.entries(result.categories).map(([label, value]) => (
                  <div key={label} className="category-item">
                    <div className="category-header">
                      <span>{label}</span>
                      <span><AnimatedNumber value={value} /></span>
                    </div>
                    <div className="bar"><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></div>
                  </div>
                ))}
              </div>

              <button className="secondary-btn" onClick={resetForm}>Run another round ↻</button>
            </div>
          )}
        </section>

        <aside className="admin-box info-box">
          <span className="eyebrow">A LITTLE SOMETHING FOR EVERY DUO</span>
          <h3>From besties to butterflies ✨</h3>
          <p>Pick the kind of connection, add two names, and let the group chat decide if the score feels right.</p>
          <div className="vibe-count">
            <strong>07</strong>
            <span><b>match vibes</b><small>one for every kind of story</small></span>
          </div>
          <div className="vibe-pills">
            {SUPPORTED_MODES.map((option) => (
              <span key={option}>{MODE_EMOJI[option]} {MODE_LABELS[option].replace(/^[^ ]+ /, '')}</span>
            ))}
          </div>
          <p className="vibe-note">A playful name game, made for sharing a laugh. 💌</p>
        </aside>
      </main>

      <footer className="retro-footer">
        <span>A score is just a number. Your people are the real magic. 💫</span>
        <div className="footer-support">
          <span className="footer-support-label">Feedback &amp; support</span>
          <a className="support-link" href="https://buymeatea.online/wallforlove" target="_blank" rel="noopener noreferrer">
            🍵 Buy me a tea
          </a>
          <a className="support-link" href="https://buymeacoffee.com/wallforlove" target="_blank" rel="noopener noreferrer">
            ☕ Buy me a coffee
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
