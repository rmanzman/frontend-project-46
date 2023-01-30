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

describe('gendiff regular work', () => {
  test.each(extensions)('working with %p extension', (extension) => {
    const filepath1 = getFixturePath(`file1.${extension}`);
    const filepath2 = getFixturePath(`file2.${extension}`);
    expect(genDiff(filepath1, filepath2)).toEqual(readFixture('patternStylish.txt'));
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(readFixture('patternStylish.txt'));
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(readFixture('patternPlain.txt'));
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(readFixture('patternJSON.txt'));
  });

  test.each(formats)('working with %p format', (format) => {
    const diff = [{ key: 'key', value: 'value', type: 'added' }];
    expect(() => {
      formatter(diff, format);
    }).not.toThrow();
  });

  test('throwing error for unsupported input format', () => {
    const unsupExt = 'html';
    expect(() => {
      parser('somedata', unsupExt);
    }).toThrow(new Error(`Unsupported format ${unsupExt}.\nSupported formats: json, yaml and yml.`));
  });

  test('throwing error for unsupported output format', () => {
    const unsupFormat = 'unknown';
    expect(() => {
      formatter('somedata', unsupFormat);
    }).toThrow(new Error(`The ${unsupFormat} format is not supported.\nSupported output formats: stylish, plain and json.`));
  });

  test.each(['stylish', 'plain'])('throwing error for unknown type of node in %p output format', (output) => {
    const nodeWithUnknownType = [{ key: 'key', value: 'value', type: 'boom' }];
    expect(() => formatter(nodeWithUnknownType, output)).toThrow(new Error('Unknown type of node \'boom\'.'));
  });
});
