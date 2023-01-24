import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

// const formats = ['json', 'yaml', 'yml'];

test('genDiff should work correctly', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  expect(genDiff(filepath1, filepath2)).toEqual(readFixture('expectedStylish.txt'));
});

// describe('genDiff should work correctly', () => {
//   test.each(formats)('genDiff should work with %p', (format) => {
//     const filepath1 = getFixturePath(`file1.${format}`);
//     const filepath2 = getFixturePath(`file2.${format}`);
//     expect(genDiff(filepath1, filepath2)).toEqual(readFixture('expectedStylish.txt'));
//     expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFixture('expectedStylish.txt'));
//     expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFixture('expectedPlain.txt'));
//     expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFixture('expectedJSON.txt'));
//   });
// });
