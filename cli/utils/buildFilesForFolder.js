const fs = require('fs');
const { mkDir } = require('rndm-utils');

const buildFilesForFolder = (object, path) => {
  mkDir(path);
  const { files = [], folders } = object;
  files.forEach(file => {
    const filename = [path, file.filename].join('/');
    if (!fs.existsSync(filename)) fs.writeFileSync(filename, file.string);
  });
  if (folders) Object.keys(folders).forEach(folder => buildFilesForFolder(folders[folder], [path, folder].join('/')));
};

module.exports = buildFilesForFolder;
