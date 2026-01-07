#!/usr/bin/env node
/**
 * Start MongoDB Server
 * Starts MongoDB in the background before launching the application
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// MongoDB executable path (Windows)
const mongoDbPath = 'C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe';
const dataDir = 'C:\\data\\db';

// Check if MongoDB executable exists
if (!fs.existsSync(mongoDbPath)) {
  console.error('❌ MongoDB not found at:', mongoDbPath);
  console.error('Please install MongoDB from: https://www.mongodb.com/try/download/community');
  process.exit(1);
}

// Check if data directory exists, create if not
if (!fs.existsSync(dataDir)) {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('✅ Created MongoDB data directory:', dataDir);
  } catch (err) {
    console.error('❌ Failed to create data directory:', err.message);
    process.exit(1);
  }
}

console.log('🚀 Starting MongoDB...');
console.log('   Path:', mongoDbPath);
console.log('   Data Dir:', dataDir);

// Start MongoDB
const mongodb = spawn(mongoDbPath, ['--dbpath', dataDir], {
  stdio: ['ignore', 'ignore', 'ignore'],
  detached: true,
  windowsHide: true
});

// Handle errors
mongodb.on('error', (err) => {
  console.error('❌ Failed to start MongoDB:', err.message);
  process.exit(1);
});

// Unref to allow process to exit independently
mongodb.unref();

// Wait for MongoDB to start (2 seconds)
setTimeout(() => {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';
  
  // Find the actual network IP address
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
        break;
      }
    }
    if (localIP !== 'localhost') break;
  }
  
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║      Emirastic ICT Quiz Starting...           ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  console.log('✅ MongoDB started successfully!');
  console.log('   Database: mongodb://localhost:27017\n');
  console.log('📡 Network Information:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (localIP !== 'localhost') {
    console.log(`   Your IP Address: ${localIP}`);
    console.log(`   \n   Access from network devices:`);
    console.log(`   Frontend: http://${localIP}:3000`);
    console.log(`   Backend:  http://${localIP}:5000`);
  } else {
    console.log('   Local access only (localhost)');
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🔄 Starting servers...\n');
  process.exit(0);
}, 2000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⚠️ MongoDB will continue running in background');
  console.log('Tip: Use "taskkill /F /IM mongod.exe" to stop it manually');
  process.exit(0);
});
