const importStore = (input) => {
  const redux = input.ast.program.body.find(node => (
    node.type === 'ImportDeclaration' &&
    node.source.value === './redux'
  ));

  if (!redux) {
    const insert = {
      type: 'ImportDeclaration',
      specifiers: [{
        type: 'ImportDefaultSpecifier',
        local: {
          type: 'Identifier',
          name: 'store',
        }
      }],
      source: {
        type: 'StringLiteral',
        extra: { rawValue: './redux', raw: '\'./redux\'' },
        value: './redux',
      }
    };

    const length = input.ast.program.body.filter(i => i.type === 'ImportDeclaration').length;

    input.ast.program.body.splice(length - 1,0, insert)
  }
};

module.exports = importStore;
