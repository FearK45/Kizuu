import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateCompatibility,
  calculateNameValue,
  createDeterministicSeed,
  normalizeName,
  normalizeScore,
  SUPPORTED_MODES,
} from './compatibility.js';

const sampleModes = ['GF', 'CRUSH', 'FRIENDSHIP', 'EX', 'HUSBAND'];

test('normalizes names and calculates A1Z26 name values', () => {
  assert.equal(normalizeName('Amán S!'), 'AMANS');
  assert.equal(calculateNameValue('AMAN'), 29);
});

test('maps raw scores into the inclusive 40–90 range', () => {
  assert.equal(normalizeScore(-10), 40);
  assert.equal(normalizeScore(50), 65);
  assert.equal(normalizeScore(110), 90);
});

test('is deterministic and keeps all output factors bounded', () => {
  for (const mode of SUPPORTED_MODES) {
    const first = calculateCompatibility('AMAN', 'ANSHIKA', mode);
    const second = calculateCompatibility('AMAN', 'ANSHIKA', mode);

    assert.deepEqual(first, second);
    assert.ok(first.score >= 40 && first.score <= 90);
    for (const factor of Object.values(first.breakdown)) {
      assert.ok(factor >= 0 && factor <= 100);
    }
  }
});

test('the requested sample modes produce distinct deterministic scores', () => {
  const results = sampleModes.map((mode) => calculateCompatibility('AMAN', 'ANSHIKA', mode));
  const scores = results.map((result) => result.score);

  assert.equal(new Set(scores).size, sampleModes.length, JSON.stringify(Object.fromEntries(
    results.map((result) => [result.mode, result.score]),
  )));
});

test('changing either name or mode changes the deterministic seed', () => {
  const baseSeed = createDeterministicSeed('AMAN', 'ANSHIKA', 'GF');

  assert.notEqual(createDeterministicSeed('AMAL', 'ANSHIKA', 'GF'), baseSeed);
  assert.notEqual(createDeterministicSeed('AMAN', 'ANSHITA', 'GF'), baseSeed);
  assert.notEqual(createDeterministicSeed('AMAN', 'ANSHIKA', 'CRUSH'), baseSeed);
});