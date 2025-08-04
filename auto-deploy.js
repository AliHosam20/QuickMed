const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const GIT_REMOTE = 'origin';
const GIT_BRANCH = 'main';
const WATCH_DIRECTORIES = [
  'public',
  'server',
  'schema.sql',
  'init-db.js',
  'package.json'
];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Auto-Deploy] ${message}${colors.reset}`);
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        log(`Error: ${error.message}`, 'red');
        reject(error);
        return;
      }
      if (stderr) {
        log(`Stderr: ${stderr}`, 'yellow');
      }
      resolve(stdout);
    });
  });
}

async function gitAdd() {
  try {
    await executeCommand('git add .');
    log('Files added to git', 'green');
  } catch (error) {
    log('Failed to add files', 'red');
    throw error;
  }
}

async function gitCommit() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await executeCommand(`git commit -m "Auto-deploy: ${timestamp}"`);
    log('Changes committed', 'green');
  } catch (error) {
    log('Failed to commit changes', 'red');
    throw error;
  }
}

async function gitPush() {
  try {
    await executeCommand(`git push ${GIT_REMOTE} ${GIT_BRANCH}`);
    log('Changes pushed to GitHub', 'green');
  } catch (error) {
    log('Failed to push changes', 'red');
    throw error;
  }
}

async function deployChanges() {
  try {
    log('Starting auto-deploy...', 'blue');
    
    // Check if there are changes
    const status = await executeCommand('git status --porcelain');
    if (!status.trim()) {
      log('No changes detected', 'yellow');
      return;
    }
    
    await gitAdd();
    await gitCommit();
    await gitPush();
    
    log('Auto-deploy completed successfully!', 'green');
  } catch (error) {
    log(`Auto-deploy failed: ${error.message}`, 'red');
  }
}

// Watch for file changes
function watchFiles() {
  log('Starting file watcher...', 'blue');
  
  WATCH_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename && !filename.startsWith('.') && !filename.includes('node_modules')) {
          log(`File changed: ${filename}`, 'yellow');
          // Debounce the deploy to avoid multiple rapid deployments
          clearTimeout(global.deployTimeout);
          global.deployTimeout = setTimeout(deployChanges, 2000);
        }
      });
    }
  });
  
  log('File watcher started. Press Ctrl+C to stop.', 'blue');
}

// Main execution
async function main() {
  try {
    // Check if git repository exists
    if (!fs.existsSync('.git')) {
      log('Git repository not found. Please run "git init" first.', 'red');
      return;
    }
    
    // Check if remote exists
    const remotes = await executeCommand('git remote -v');
    if (!remotes.includes(GIT_REMOTE)) {
      log(`Remote '${GIT_REMOTE}' not found. Please add your GitHub remote.`, 'red');
      return;
    }
    
    watchFiles();
  } catch (error) {
    log(`Error: ${error.message}`, 'red');
  }
}

// Handle process termination
process.on('SIGINT', () => {
  log('Stopping auto-deploy...', 'yellow');
  process.exit(0);
});

// Start the auto-deploy system
main(); 