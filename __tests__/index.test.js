import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// test('json', () => {
//   const filename1 = getFixturePath('file1.json');
//   const filename2 = getFixturePath('file2.json');
//   const resultName = getFixturePath('expectedStylish.txt');
//   const result = readFileSync(resultName, 'utf8');
//   expect(genDiff(filename1, filename2)).toBe(result);
// });

test('json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(readFixture('expectedStylish.txt'));
});
