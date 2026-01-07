require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
// Configure CORS to allow requests from any origin on the network
app.use(cors({
  origin: true, // Allow all origins (for local network access)
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/results', require('./routes/results'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/builder', require('./routes/builder'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let localIP = 'localhost';
  
  // Find the actual network IP address
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        localIP = net.address;
        break;
      }
    }
    if (localIP !== 'localhost') break;
  }
  
  console.log('\n🚀 Backend Server Started!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Local:    http://localhost:${PORT}`);
  if (HOST === '0.0.0.0' && localIP !== 'localhost') {
    console.log(`   Network:  http://${localIP}:${PORT}`);
    console.log('   → Accessible from other devices on your network');
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

module.exports = app;
