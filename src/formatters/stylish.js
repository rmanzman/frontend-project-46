const iter = (diff) => diff.map((node) => {
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

export default (diff) => {
  const result = iter(diff);
  return buildLinesOutput(result);
};
