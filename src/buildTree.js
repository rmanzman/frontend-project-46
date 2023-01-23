import _ from 'lodash';

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

export default buildTree;
