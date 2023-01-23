import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import format from './formatters/index.js';
import buildTree from './buildTree.js';
import parseData from './parsers.js';

const getFormat = (filepath) => _.trim(path.extname(filepath), '.');

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parseData(data, getFormat(filepath));
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const dataFromFile1 = readFile(filepath1);
  const dataFromFile2 = readFile(filepath2);
  const tree = buildTree(dataFromFile1, dataFromFile2);
  return format(tree, formatName);
};
