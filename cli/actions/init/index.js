const fs = require('fs');
const { range } = require('lodash');
const babel = require('babel-core');
const generator = require('babel-generator');
const { buildFilesForFolder } = require('@rndm/utils');
const input = require('./files');
const transform = require('./transform');

const current = process.cwd();

const init = (cmd = {}) => {
  const relativity = range(cmd.node ? 2 : 0).map(() => '..').join('/');
  const src = [current, relativity, 'src'].join('/');
  const base = [src, 'app', 'redux'].join('/');
  buildFilesForFolder(input, base);

  const file = [src, 'app', 'index.js'].join('/');
  const entry = fs.readFileSync(file).toString();

  const options = {
    presets: ['react'],
  };

  const babelified = babel.transform(entry, options);

  transform(babelified);

  const { code } = generator.default(babelified.ast, options);

  const jsx = babel.transform(code, {
    plugins: ['transform-react-createelement-to-jsx'],
  });

  fs.writeFileSync(file, jsx.code + '\n')

};

module.exports = init;
