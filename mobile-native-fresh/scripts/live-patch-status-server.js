// live-patch-status-server.js
const { exec } = require('child_process');
const path = require('path');

const express = require('express');

const app = express();

// Enable CORS for remote access
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main patch status endpoint
app.get('/', (_, res) => {
  // FIXED: Point to correct scripts directory
  const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'live-patch-status.js');
  
  exec(`node ${scriptPath} snapshot`, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error executing live-patch-status.js:', err);
      return res.status(500).send(`Error: ${stderr || err.message}`);
    }
    
    console.log('📡 Live patch status requested');
    res.type('text/plain').send(stdout);
  });
});

// Detailed status endpoint
app.get('/detailed', (_, res) => {
  // FIXED: Point to correct scripts directory
  const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'live-patch-status.js');
  
  exec(`node ${scriptPath} snapshot --10`, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error executing live-patch-status.js detailed:', err);
      return res.status(500).send(`Error: ${stderr || err.message}`);
    }
    
    console.log('📡 Detailed patch status requested');
    res.type('text/plain').send(stdout);
  });
});

// JSON status endpoint
app.get('/json', (_, res) => {
  // FIXED: Point to correct scripts directory
  const scriptPath = path.join(__dirname, '..', '..', 'scripts', 'live-patch-status.js');
  
  exec(`node ${scriptPath} json`, (err, stdout, stderr) => {
    if (err) {
      console.error('❌ Error executing live-patch-status.js json:', err);
      return res.status(500).json({ error: stderr || err.message });
    }
    
    try {
      const data = JSON.parse(stdout);
      console.log('📡 JSON patch status requested');
      res.json(data);
    } catch (parseError) {
      console.error('❌ Error parsing JSON output:', parseError);
      res.status(500).json({ error: 'Invalid JSON output from script' });
    }
  });
});

const PORT = 4123;
app.listen(PORT, () => {
  console.log(`📡 Live patch status server running at http://localhost:${PORT}`);
  console.log(`🔗 Endpoints:`);
  console.log(`   - GET /          - Basic patch status`);
  console.log(`   - GET /detailed  - Detailed patch status`);
  console.log(`   - GET /json      - JSON patch status`);
  console.log(`   - GET /health    - Health check`);
}); 