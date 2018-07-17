const fs = require('fs');
const program = require('commander');
const init = require('./actions/init');

const current = process.cwd();

const json = JSON.parse(fs.readFileSync([current, 'package.json'].join('/')).toString(), null, 2);

program
  .version(json.version)
  .description('CLI test system');

program
  .command('init')
  .option('-n, --node', 'Perform as node module (Offsets directory by 2)')
  .action(init);

program.parse(process.argv);
