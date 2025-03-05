const fs = require('fs');
const path = require('path');

// Get the project root directory
const projectRoot = path.resolve(__dirname, '../..');
const configPath = path.join(projectRoot, 'system/config/paths.json');
const { ROOT_DIR, HOME_DIR } = require(configPath);

function updateMarkdownFiles(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      updateMarkdownFiles(fullPath);
    } else if (file.endsWith('.md')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace the hardcoded root path with environment variable
      content = content.replace(
        new RegExp(ROOT_DIR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        '${process.env.ROOT_PATH}'
      );
      
      // Replace the hardcoded home directory path with environment variable
      content = content.replace(
        new RegExp(HOME_DIR.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
        '${process.env.HOME_PATH}'
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${fullPath}`);
    }
  });
}

// Create the environment setup script
const envSetupPath = path.join(projectRoot, 'system/core/env-setup.js');
const envSetupContent = `const { ROOT_DIR, HOME_DIR } = require('../config/paths.json');

// Set up environment variables
process.env.ROOT_PATH = ROOT_DIR;
process.env.HOME_PATH = HOME_DIR;

module.exports = {
  ROOT_PATH: ROOT_DIR,
  HOME_PATH: HOME_DIR,
  getPath: (relativePath) => require('path').join(ROOT_DIR, relativePath),
  getHomePath: (relativePath) => relativePath ? require('path').join(HOME_DIR, relativePath) : HOME_DIR
};`;

fs.writeFileSync(envSetupPath, envSetupContent);
console.log('Created/Updated env-setup.js');

// Update path-manager.js to use env-setup
const pathManagerPath = path.join(projectRoot, 'system/core/path-manager.js');
const pathManagerContent = `// Re-export environment setup for backward compatibility
module.exports = require('./env-setup');`;

fs.writeFileSync(pathManagerPath, pathManagerContent);
console.log('Updated path-manager.js');

// Update all markdown files
const systemDir = path.join(projectRoot, 'system');
updateMarkdownFiles(systemDir);