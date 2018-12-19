const importReactRedux = (input) => {
  const redux = input.ast.program.body.find(node => (
    node.type === 'ImportDeclaration' &&
    node.source.value === 'react-redux'
  ));

  const importProvider = {
    type: 'ImportSpecifier',
    imported: {
      type: 'Identifier',
      name: 'Provider',
    }
  };

  if (redux) {
    const provider = redux.specifiers.find(specifier => specifier.imported.name === 'Provider');
    if (!provider) {
      redux.specifiers = (redux.specifiers || []);
      redux.specifiers.push(importProvider);
    }
  } else {
    const insert = {
      type: 'ImportDeclaration',
      specifiers: [importProvider],
      source: {
        type: 'StringLiteral',
        extra: { rawValue: 'react-redux', raw: '\'react-redux\'' },
        value: 'react-redux',
      }
    };
    input.ast.program.body.splice(1,0, insert);
  }
};

module.exports = importReactRedux;
