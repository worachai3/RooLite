const { ROOT_DIR, HOME_DIR } = require('../config/paths.json');

// Set up environment variables
process.env.ROOT_PATH = ROOT_DIR;
process.env.HOME_PATH = HOME_DIR;

module.exports = {
  ROOT_PATH: ROOT_DIR,
  HOME_PATH: HOME_DIR,
  getPath: (relativePath) => require('path').join(ROOT_DIR, relativePath),
  getHomePath: (relativePath) => relativePath ? require('path').join(HOME_DIR, relativePath) : HOME_DIR
};