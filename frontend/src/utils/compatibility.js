export const SUPPORTED_MODES = ['FRIENDSHIP', 'CRUSH', 'GF', 'BF', 'WIFE', 'HUSBAND', 'EX'];

const MODE_PROFILES = {
  FRIENDSHIP: {
    label: 'Friendship',
    weights: { nameCompatibility: .18, numerology: .06, vowelPattern: .08, letterFrequency: .15, positionPattern: .12, lengthBalance: .14, initialRelationship: .05, combinedNameMode: .05, seedCompatibility: .06, modeCompatibility: .11 },
    modeWeights: { nameCompatibility: .24, letterFrequency: .2, lengthBalance: .2, positionPattern: .15, vowelPattern: .1, seedCompatibility: .11 },
    categories: {
      'Friendship compatibility': { nameCompatibility: .5, lengthBalance: .3, initialRelationship: .2 },
      Understanding: { numerology: .25, letterFrequency: .4, positionPattern: .35 },
      Vibe: { vowelPattern: .35, combinedNameMode: .3, seedCompatibility: .35 },
      'Name pattern': { nameCompatibility: .35, letterFrequency: .3, positionPattern: .35 },
      'Fun factor': { seedCompatibility: .65, vowelPattern: .35 },
    },
  },
  CRUSH: {
    label: 'Crush',
    weights: { nameCompatibility: .13, numerology: .07, vowelPattern: .12, letterFrequency: .08, positionPattern: .11, lengthBalance: .06, initialRelationship: .1, combinedNameMode: .11, seedCompatibility: .12, modeCompatibility: .1 },
    modeWeights: { vowelPattern: .19, initialRelationship: .15, positionPattern: .17, numerology: .12, combinedNameMode: .15, seedCompatibility: .22 },
    categories: {
      Attraction: { initialRelationship: .35, vowelPattern: .3, seedCompatibility: .35 },
      Chemistry: { numerology: .3, letterFrequency: .25, modeCompatibility: .45 },
      'Name sync': { nameCompatibility: .4, positionPattern: .35, combinedNameMode: .25 },
      Vibe: { vowelPattern: .4, initialRelationship: .25, letterFrequency: .35 },
      'Crush factor': { modeCompatibility: .65, seedCompatibility: .35 },
    },
  },
  GF: {
    label: 'Girlfriend',
    weights: { nameCompatibility: .12, numerology: .1, vowelPattern: .08, letterFrequency: .12, positionPattern: .13, lengthBalance: .11, initialRelationship: .08, combinedNameMode: .07, seedCompatibility: .08, modeCompatibility: .11 },
    modeWeights: { nameCompatibility: .15, letterFrequency: .14, lengthBalance: .17, positionPattern: .12, numerology: .16, combinedNameMode: .12, seedCompatibility: .14 },
    categories: {
      Chemistry: { nameCompatibility: .3, vowelPattern: .25, seedCompatibility: .45 },
      Understanding: { numerology: .3, letterFrequency: .35, positionPattern: .35 },
      'Bond strength': { lengthBalance: .35, numerology: .3, letterFrequency: .35 },
      'Name sync': { nameCompatibility: .35, positionPattern: .35, combinedNameMode: .3 },
      'Relationship factor': { modeCompatibility: .65, seedCompatibility: .35 },
    },
  },
  BF: {
    label: 'Boyfriend',
    weights: { nameCompatibility: .13, numerology: .08, vowelPattern: .11, letterFrequency: .1, positionPattern: .12, lengthBalance: .09, initialRelationship: .07, combinedNameMode: .08, seedCompatibility: .11, modeCompatibility: .11 },
    modeWeights: { nameCompatibility: .15, vowelPattern: .11, positionPattern: .15, lengthBalance: .14, initialRelationship: .14, combinedNameMode: .14, seedCompatibility: .17 },
    categories: {
      Chemistry: { nameCompatibility: .3, vowelPattern: .25, seedCompatibility: .45 },
      Understanding: { numerology: .3, letterFrequency: .35, positionPattern: .35 },
      'Bond strength': { lengthBalance: .35, numerology: .3, letterFrequency: .35 },
      'Name sync': { nameCompatibility: .35, positionPattern: .35, combinedNameMode: .3 },
      'Relationship factor': { modeCompatibility: .65, seedCompatibility: .35 },
    },
  },
  WIFE: {
    label: 'Wife',
    weights: { nameCompatibility: .11, numerology: .1, vowelPattern: .08, letterFrequency: .11, positionPattern: .12, lengthBalance: .15, initialRelationship: .07, combinedNameMode: .07, seedCompatibility: .07, modeCompatibility: .12 },
    modeWeights: { lengthBalance: .2, letterFrequency: .15, positionPattern: .13, nameCompatibility: .12, numerology: .12, combinedNameMode: .1, seedCompatibility: .18 },
    categories: {
      Understanding: { numerology: .3, letterFrequency: .35, positionPattern: .35 },
      Stability: { lengthBalance: .45, letterFrequency: .3, positionPattern: .25 },
      'Long-term bond': { lengthBalance: .35, numerology: .3, initialRelationship: .15, modeCompatibility: .2 },
      'Name sync': { nameCompatibility: .35, positionPattern: .35, combinedNameMode: .3 },
      'Relationship factor': { modeCompatibility: .65, seedCompatibility: .35 },
    },
  },
  HUSBAND: {
    label: 'Husband',
    weights: { nameCompatibility: .12, numerology: .09, vowelPattern: .08, letterFrequency: .12, positionPattern: .12, lengthBalance: .15, initialRelationship: .07, combinedNameMode: .08, seedCompatibility: .07, modeCompatibility: .1 },
    modeWeights: { lengthBalance: .17, positionPattern: .15, numerology: .14, letterFrequency: .13, nameCompatibility: .13, initialRelationship: .1, combinedNameMode: .08, seedCompatibility: .1 },
    categories: {
      Understanding: { numerology: .3, letterFrequency: .35, positionPattern: .35 },
      Stability: { lengthBalance: .45, letterFrequency: .3, positionPattern: .25 },
      'Long-term bond': { lengthBalance: .35, numerology: .3, initialRelationship: .15, modeCompatibility: .2 },
      'Name sync': { nameCompatibility: .35, positionPattern: .35, combinedNameMode: .3 },
      'Relationship factor': { modeCompatibility: .65, seedCompatibility: .35 },
    },
  },
  EX: {
    label: 'Ex',
    weights: { nameCompatibility: .13, numerology: .06, vowelPattern: .08, letterFrequency: .1, positionPattern: .12, lengthBalance: .06, initialRelationship: .08, combinedNameMode: .12, seedCompatibility: .13, modeCompatibility: .12 },
    modeWeights: { nameCompatibility: .16, letterFrequency: .12, positionPattern: .14, vowelPattern: .1, numerology: .12, combinedNameMode: .1, initialRelationship: .08, separationPattern: .1, seedCompatibility: .08 },
    categories: {
      'Emotional connection': { nameCompatibility: .35, vowelPattern: .25, numerology: .4 },
      Chemistry: { letterFrequency: .3, vowelPattern: .25, seedCompatibility: .45 },
      'Bond pattern': { positionPattern: .4, letterFrequency: .3, combinedNameMode: .3 },
      'Name connection': { nameCompatibility: .4, combinedNameMode: .35, initialRelationship: .25 },
      'Separation pattern': { separationPattern: .65, seedCompatibility: .35 },
    },
  },
};

const clampScore = (value) => Math.max(0, Math.min(100, value));

// Standardizing case, accents, spaces, and punctuation keeps equivalent spellings consistent.
export const normalizeName = (name) => String(name ?? '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toUpperCase()
  .replace(/[^A-Z]/g, '');

// Alphabet values provide a small, reproducible numerology feature without external data.
export const calculateNameValue = (name) => [...normalizeName(name)]
  .reduce((total, letter) => total + letter.charCodeAt(0) - 64, 0);

export const calculateCombinedNameValue = (person1Name, person2Name) => (
  calculateNameValue(person1Name) + calculateNameValue(person2Name)
);

// Unique-letter overlap represents shared name patterns, not measured human compatibility.
export const calculateCommonLetters = (person1Name, person2Name) => {
  const firstLetters = new Set(normalizeName(person1Name));
  const secondLetters = new Set(normalizeName(person2Name));
  const commonLetters = [...firstLetters].filter((letter) => secondLetters.has(letter));
  const unionSize = new Set([...firstLetters, ...secondLetters]).size;

  return {
    letters: commonLetters,
    score: unionSize ? (commonLetters.length / unionSize) * 100 : 0,
  };
};

// Comparing vowel ratios gives a simple proxy for how similar the names' sound patterns are.
export const calculateVowelPattern = (person1Name, person2Name) => {
  const getRatio = (name) => {
    const letters = normalizeName(name);
    const vowels = [...letters].filter((letter) => 'AEIOU'.includes(letter)).length;
    return vowels / Math.max(letters.length, 1);
  };

  return clampScore(100 - Math.abs(getRatio(person1Name) - getRatio(person2Name)) * 100);
};

// Frequency similarity distinguishes repeated-letter patterns from mere shared unique letters.
const calculateLetterFrequency = (person1Name, person2Name) => {
  const getFrequencies = (name) => {
    const letters = normalizeName(name);
    return Array.from({ length: 26 }, (_, index) => (
      [...letters].filter((letter) => letter.charCodeAt(0) === index + 65).length / Math.max(letters.length, 1)
    ));
  };

  const first = getFrequencies(person1Name);
  const second = getFrequencies(person2Name);
  const distance = first.reduce((sum, value, index) => sum + Math.abs(value - second[index]), 0);
  return clampScore((1 - distance / 2) * 100);
};

// Relative positions capture whether shared letters appear in similar parts of each name.
export const calculatePositionPattern = (person1Name, person2Name) => {
  const first = normalizeName(person1Name);
  const second = normalizeName(person2Name);
  const { letters } = calculateCommonLetters(first, second);
  if (!letters.length) return 0;

  const similarities = letters.map((letter) => {
    const firstPosition = (first.indexOf(letter) + 0.5) / first.length;
    const secondPosition = (second.indexOf(letter) + 0.5) / second.length;
    return 1 - Math.abs(firstPosition - secondPosition);
  });

  return clampScore((similarities.reduce((sum, value) => sum + value, 0) / similarities.length) * 100);
};

// Similar name lengths form a balance factor while avoiding a divide-by-zero for empty input.
export const calculateLengthBalance = (person1Name, person2Name) => {
  const firstLength = normalizeName(person1Name).length;
  const secondLength = normalizeName(person2Name).length;
  const longest = Math.max(firstLength, secondLength);
  return longest ? (Math.min(firstLength, secondLength) / longest) * 100 : 0;
};

// Alphabet distance between initials gives the initial-letter relationship a bounded score.
const calculateInitialRelationship = (person1Name, person2Name) => {
  const firstInitial = normalizeName(person1Name).charCodeAt(0) - 64;
  const secondInitial = normalizeName(person2Name).charCodeAt(0) - 64;
  return clampScore(100 - (Math.abs(firstInitial - secondInitial) / 25) * 100);
};

const calculateNumerology = (person1Name, person2Name) => {
  const digitRoot = (value) => (value ? ((value - 1) % 9) + 1 : 0);
  const firstRoot = digitRoot(calculateNameValue(person1Name));
  const secondRoot = digitRoot(calculateNameValue(person2Name));
  return 100 - (Math.abs(firstRoot - secondRoot) / 8) * 100;
};

const normalizeMode = (mode) => {
  const normalizedMode = String(mode ?? '').trim().toUpperCase();
  if (!MODE_PROFILES[normalizedMode]) {
    throw new Error(`Unsupported relationship mode: ${mode}`);
  }
  return normalizedMode;
};

// FNV-1a is a lightweight stable hash; all three inputs affect the seed and seed-derived factor.
export const createDeterministicSeed = (person1Name, person2Name, relationshipMode) => {
  const first = normalizeName(person1Name);
  const second = normalizeName(person2Name);
  const mode = normalizeMode(relationshipMode);
  const input = `${first}|${second}|${mode}`;
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const weightedAverage = (factors, weights) => {
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  return Object.entries(weights).reduce((sum, [key, weight]) => (
    sum + (factors[key] ?? 0) * weight
  ), 0) / totalWeight;
};

// Each mode emphasizes different name signals so selecting a mode changes the actual calculation.
export const calculateModeFactor = (relationshipMode, factors) => {
  const mode = normalizeMode(relationshipMode);
  return weightedAverage(factors, MODE_PROFILES[mode].modeWeights);
};

// Map meaningful factor scores onto the requested inclusive 40–90 playful range.
export const normalizeScore = (rawScore) => 40 + Math.round((clampScore(rawScore) / 100) * 50);

const MODE_MESSAGES = {
  FRIENDSHIP: ['A fun friendship pairing!', 'A nice friend vibe!', 'Strong bestie energy!'],
  CRUSH: ['A little name-based crush score!', 'There may be a fun spark!', 'Big butterflies-in-the-name energy!'],
  GF: ['A playful relationship name score!', 'A sweet name match!', 'A lovely name-pattern match!'],
  BF: ['A playful relationship name score!', 'A sweet name match!', 'A lovely name-pattern match!'],
  WIFE: ['A playful long-term name score!', 'A warm name match!', 'A lovely name-pattern match!'],
  HUSBAND: ['A playful long-term name score!', 'A warm name match!', 'A lovely name-pattern match!'],
  EX: ['An old chapter, scored by names only!', 'An interesting name pattern!', 'A strong name connection—just for fun!'],
};

const createMessage = (mode, score) => {
  const messages = MODE_MESSAGES[mode];
  const messageIndex = score < 77 ? 0 : score < 84 ? 1 : 2;
  return messages[messageIndex];
};

const createCategories = (profile, factors) => Object.fromEntries(
  Object.entries(profile.categories).map(([label, weights]) => [
    label,
    Math.round(clampScore(weightedAverage(factors, weights))),
  ]),
);

export const calculateCompatibility = (person1Name, person2Name, relationshipMode) => {
  const person1 = normalizeName(person1Name);
  const person2 = normalizeName(person2Name);
  const mode = normalizeMode(relationshipMode);
  if (!person1 || !person2) throw new Error('Please enter valid names for both people.');

  const profile = MODE_PROFILES[mode];
  const commonLetters = calculateCommonLetters(person1, person2);
  const person1NameValue = calculateNameValue(person1);
  const person2NameValue = calculateNameValue(person2);
  const combinedNameValue = person1NameValue + person2NameValue;
  const combinedNameModeValue = calculateNameValue(`${person1}${person2}${mode}`);
  const seed = createDeterministicSeed(person1, person2, mode);
  const factors = {
    nameCompatibility: commonLetters.score,
    numerology: calculateNumerology(person1, person2),
    vowelPattern: calculateVowelPattern(person1, person2),
    letterFrequency: calculateLetterFrequency(person1, person2),
    positionPattern: calculatePositionPattern(person1, person2),
    lengthBalance: calculateLengthBalance(person1, person2),
    initialRelationship: calculateInitialRelationship(person1, person2),
    combinedNameMode: combinedNameModeValue % 101,
    seedCompatibility: seed % 101,
    modeSignature: (calculateNameValue(mode) + ((seed >>> 8) % 101)) % 101,
  };
  factors.separationPattern = 100 - factors.lengthBalance;
  factors.modeCompatibility = calculateModeFactor(mode, factors);

  // The mode signature prevents mode identity from disappearing when similar names yield close base scores.
  const rawScore = weightedAverage(factors, { ...profile.weights, modeSignature: .5 });
  const score = normalizeScore(rawScore);
  const breakdown = Object.fromEntries(
    Object.entries(factors).map(([key, value]) => [key, Math.round(clampScore(value))]),
  );

  return {
    person1,
    person2,
    mode,
    score,
    rawScore: Math.round(rawScore * 100) / 100,
    seed,
    nameValues: { person1: person1NameValue, person2: person2NameValue, combined: combinedNameValue },
    breakdown,
    categories: createCategories(profile, factors),
    title: `${profile.label.toUpperCase()} MATCH`,
    message: createMessage(mode, score),
  };
};