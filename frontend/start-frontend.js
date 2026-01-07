#!/usr/bin/env node
/**
 * Display Network Info Before Starting Frontend
 */

const os = require('os');
const { spawn } = require('child_process');

// Get network IP
const networkInterfaces = os.networkInterfaces();
let localIP = 'localhost';

for (const name of Object.keys(networkInterfaces)) {
  for (const net of networkInterfaces[name]) {
    if (net.family === 'IPv4' && !net.internal) {
      localIP = net.address;
      break;
    }
  }
  if (localIP !== 'localhost') break;
}

console.log('\n🎨 Frontend Server Starting!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`   Local:    http://localhost:3000`);
if (localIP !== 'localhost') {
  console.log(`   Network:  http://${localIP}:3000`);
  console.log('   → Share this URL with network users');
}
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Start the actual React dev server
const isWindows = process.platform === 'win32';
const npm = isWindows ? 'npm.cmd' : 'npm';

const reactStart = spawn(npm, ['start'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    BROWSER: 'none', // Don't auto-open browser
    HOST: '0.0.0.0'  // Listen on all interfaces
  }
});

reactStart.on('close', (code) => {
  process.exit(code);
});
