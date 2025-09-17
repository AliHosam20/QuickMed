const { exec } = require('child_process');

console.log('🚀 Starting GitHub upload process...');

// Add all files
exec('git add .', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Error adding files:', error);
    return;
  }
  
  console.log('✅ Files added to staging');
  
  // Commit changes
  exec('git commit -m "Final project updates: Enhanced booking system, UI improvements, and comprehensive documentation"', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error committing:', error);
      return;
    }
    
    console.log('✅ Changes committed');
    
    // Push to GitHub
    exec('git push origin main', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error pushing to GitHub:', error);
        return;
      }
      
      console.log('🎉 Successfully uploaded to GitHub!');
      console.log('📁 Repository: https://github.com/AliHosam20/QuickMed');
    });
  });
});
