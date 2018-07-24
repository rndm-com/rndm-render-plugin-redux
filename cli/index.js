const fs = require('fs');
const program = require('commander');
const init = require('./actions/init');
const example = require('./actions/example');
const babel = require('babel-core');

const name = 'rndm-render-plugin-redux';

program
  .version('0.1.0')
  .description('RNDM Renderer Redux Plugin');

program
  .command('init')
  .option('-n, --node', 'Perform as node module (Offsets directory by 2)')
  .action(init);

if (process.argv.slice(0, 2).find(i => i.includes(name))) program.parse(process.argv);

module.exports.init = init;
module.exports.example = example;
