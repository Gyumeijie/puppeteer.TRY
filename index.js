const checker = require('./lib');
const fs = require('fs');
const os = require('os');

const readConfigFile = () => {
  const path = '~/.site-watcher.json'.replace('~', os.homedir());
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
};

const configs = readConfigFile();
checker(configs);
