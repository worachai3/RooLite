const { ROOT_DIR } = require('../config/paths.json');

// Set up global variables
global.ROOT_PATH = ROOT_DIR;

// Export commonly used paths and utilities
module.exports = {
  ROOT_PATH: ROOT_DIR,
  getPath: (relativePath) => require('path').join(ROOT_DIR, relativePath)
};