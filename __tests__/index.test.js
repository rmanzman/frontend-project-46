import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import formatter from '../src/formatters/index.js';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const formats = ['json', 'yaml', 'yml'];

describe('gendiff regular work', () => {
  test.each(formats)('test of working with %p', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(readFixture('patternStylish.txt'));
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFixture('patternStylish.txt'));
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFixture('patternPlain.txt'));
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFixture('patternJSON.txt'));
  });

  test('test of throwing error for unknown input format', () => {
    expect(() => {
      parser('somedata', 'exe');
    }).toThrow(new Error('Unknown format exe.\nSupported formats: json, yaml and yml.'));
  });

  test('test of throwing error for unknown output format', () => {
    expect(() => {
      formatter('unknown', 'unknown');
    }).toThrow(new Error('The unknown format is not supported.\nSupported output formats: stylish, plain and json.'));
  });
});
