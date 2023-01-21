import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parsers.js';
// import format from './formatters/index.js';

const getFormat = (filepath) => _.trim(path.extname(filepath), '.');

const readFile = (filepath) => {
  const fullPath = path.resolve(filepath);
  const data = readFileSync(fullPath, 'utf-8');
  return parseData(data, getFormat(filepath));
};

const buildTree = (dataFromFile1, dataFromFile2) => {
  const keys = _.sortBy(_.union(_.keys(dataFromFile1), _.keys(dataFromFile2)));
  return keys.map((key) => {
    if (!_.has(dataFromFile2, key)) {
      return { key, value: dataFromFile1[key], flag: 'deleted' };
    }
    if (!_.has(dataFromFile1, key)) {
      return { key, value: dataFromFile2[key], flag: 'added' };
    }
    if (_.isPlainObject(dataFromFile1[key]) && _.isPlainObject(dataFromFile2[key])) {
      return { key, children: buildTree(dataFromFile1[key], dataFromFile2[key]), flag: 'nested' };
    }
    if (!_.isEqual(dataFromFile1[key], dataFromFile2[key])) {
      return {
        key, value1: dataFromFile1[key], value2: dataFromFile2[key], flag: 'changed',
      };
    }
    return { key, value: dataFromFile1[key], flag: 'unchanged' };
  });
};

const stringify = (tree) => tree.map((node) => {
  switch (node.flag) {
    case 'deleted':
      return `  - ${node.key}: ${node.value}`;
    case 'added':
      return `  + ${node.key}: ${node.value}`;
    case 'changed':
      return `  - ${node.key}: ${node.value1}\n  + ${node.key}: ${node.value2}`;
    case 'unchanged':
      return `    ${node.key}: ${node.value}`;
    default:
      throw new Error(`Unknown type of node ${node.type}.`);
  }
});

const buildLinesOutput = (diff) => {
  return [
    '{',
    ...diff,
    '}',
  ].join('\n');
};

export default (filepath1, filepath2/* , format = 'stylish' */) => {
  const dataFromFile1 = readFile(filepath1);
  const dataFromFile2 = readFile(filepath2);
  const tree = buildTree(dataFromFile1, dataFromFile2);
  const diff = stringify(tree);
  const stylishOutput = buildLinesOutput(diff);
  return stylishOutput;
};
