const addJSXProvider = (input) => {
  const declaration = input.ast.program.body.find(node => node.type === 'VariableDeclaration');
  const declarator = declaration.declarations.find(node => node.type === 'VariableDeclarator');
  const provider = declarator.init.body.arguments.find(node => node.name === 'Provider');

  if (!provider) {
    declarator.init.body.arguments = [
      {
        type: 'Identifier',
        name: 'Provider',
      },
      {
        type: 'ObjectExpression',
        properties: [
          {
            type: 'ObjectProperty',
            key: {
              type: 'Identifier',
              name: 'store'
            },
            value: {
              type: 'Identifier',
              loc: {
                identifierName: 'store'
              },
              name: 'store'
            },
            computed: false,
            shorthand: false,
            decorators: null,
            trailingComments: [],
            leadingComments: [],
            innerComments: []
          }
        ],
      },
      {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: { type: 'Identifier', name: 'React' },
          property: { type: 'Identifier', name: 'createElement' },
          computed: false
        },
        arguments: declarator.init.body.arguments,
      }
    ]
  }
};

module.exports = addJSXProvider;
