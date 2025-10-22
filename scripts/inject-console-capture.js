const fs = require('fs');
const path = require('path');

// Read the console capture script
const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
const scriptTag = `<script>${scriptContent}</script>`;

// Find all HTML files in the build output
function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Inject script into HTML files
function injectScript() {
  const outDir = path.join(__dirname, '..', 'out');
  
  if (!fs.existsSync(outDir)) {
    console.log('No build output found. Run build first.');
    return;
  }
  
  const htmlFiles = findHtmlFiles(outDir);
  
  htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Only inject if not already present
    if (!content.includes('console-capture')) {
      // Inject right after <head> tag
      content = content.replace('<head>', `<head>${scriptTag}`);
      fs.writeFileSync(file, content);
      console.log(`Injected console capture into ${file}`);
    }
  });
  
  console.log('Console capture injection complete!');
}

injectScript();