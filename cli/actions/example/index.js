const fs = require('fs');
const { mkDir } = require('rndm-utils');
const examples = require('./examples');

const current = process.cwd();

const example = (cmd = {}) => {
  const src = [current, 'src'].filter(Boolean).join('/');
  const examplesFolder = [src, 'app', 'rndm_examples'].join('/');
  const examplesJSONFolder = [examplesFolder, 'json'].join('/');
  const examplesViewsFolder = [examplesFolder, 'views'].join('/');
  const { template = 'basic' } = cmd;
  const example = examples[template] || examples.basic;
  mkDir(examplesJSONFolder)
  mkDir(examplesViewsFolder)
  const exampleJSONFile = [examplesJSONFolder, `${template}.json`].join('/');
  const exampleViewFile = [examplesViewsFolder, `${template}.js`].join('/');
  if (!fs.existsSync(exampleJSONFile)) fs.writeFileSync(exampleJSONFile, JSON.stringify(example, null, 2));
  if (!fs.existsSync(exampleViewFile)) {
    const view = `import { render } from 'rndm-render';
import views from '../json/${template}.json';

const View = () => render(views);

export default View;
`
    fs.writeFileSync(exampleViewFile, view);
  }
}

module.exports = example;
