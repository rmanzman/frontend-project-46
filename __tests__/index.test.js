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

const extensions = ['json', 'yaml', 'yml'];
const formats = ['stylish', 'plain', 'json'];

describe('gendiff run with different extensions', () => {
  test.each(extensions)('should working with %p', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    expect(() => {
      genDiff(filepath1, filepath2);
    }).not.toThrow();
  });
});

describe.each(formats)('gendiff run with \'%s\' output format', (format) => {
  const expected = readFixture(`${format}.txt`, 'utf-8');
  test(`should match '${format}.txt' pattern`, () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    expect(genDiff(filepath1, filepath2, format)).toBe(expected);
  });
});

describe('gendiff throwing errors check', () => {
  test('for unsupported input format', () => {
    const unsupExt = 'html';
    expect(() => {
      parser('somedata', unsupExt);
    }).toThrow(new Error(`Unsupported format ${unsupExt}.\nSupported formats: json, yaml and yml.`));
  });

  test('for unsupported output format', () => {
    const unsupFormat = 'unknown';
    expect(() => {
      formatter('somedata', unsupFormat);
    }).toThrow(new Error(`The ${unsupFormat} format is not supported.\nSupported output formats: stylish, plain and json.`));
  });

  test.each(['stylish', 'plain'])('for unknown type of node in %p output format', (output) => {
    const nodeWithUnknownType = [{ key: 'key', value: 'value', type: 'boom' }];
    expect(() => formatter(nodeWithUnknownType, output)).toThrow(new Error('Unknown type of node \'boom\'.'));
  });
});
