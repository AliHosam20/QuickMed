const { exec } = require('child_process');
const fs = require('fs');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Setup] ${message}${colors.reset}`);
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

async function setupGit() {
  try {
    log('Starting Git setup...', 'blue');
    
    // Check if git is installed
    try {
      await executeCommand('git --version');
      log('Git is installed', 'green');
    } catch (error) {
      log('Git is not installed. Please install Git first.', 'red');
      return;
    }
    
    // Remove large files first
    log('Removing large files...', 'yellow');
    const largeFiles = [
      'node_modules',
      'quickmed.db',
      'package-lock.json',
      'seed-all-data.js',
      'seed-data.js'
    ];
    
    for (const file of largeFiles) {
      if (fs.existsSync(file)) {
        if (fs.lstatSync(file).isDirectory()) {
          fs.rmSync(file, { recursive: true, force: true });
        } else {
          fs.unlinkSync(file);
        }
        log(`Removed: ${file}`, 'yellow');
      }
    }
    
    // Initialize git repository
    log('Initializing Git repository...', 'blue');
    await executeCommand('git init');
    log('Git repository initialized', 'green');
    
    // Add files
    log('Adding files to Git...', 'blue');
    await executeCommand('git add .');
    log('Files added', 'green');
    
    // Initial commit
    log('Creating initial commit...', 'blue');
    await executeCommand('git commit -m "Initial commit: QuickMed medical appointment system"');
    log('Initial commit created', 'green');
    
    log('Git setup completed successfully!', 'green');
    log('Next steps:', 'blue');
    log('1. Create a repository on GitHub', 'yellow');
    log('2. Run: git remote add origin https://github.com/YOUR_USERNAME/QuickMed.git', 'yellow');
    log('3. Run: git branch -M main', 'yellow');
    log('4. Run: git push -u origin main', 'yellow');
    log('5. Run: npm install (to reinstall dependencies)', 'yellow');
    
  } catch (error) {
    log(`Setup failed: ${error.message}`, 'red');
  }
}

// Run the setup
setupGit(); 