const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3003;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`🚀 Fabric.js Deep Dive website running at:`);
    console.log(`   http://localhost:${port}`);
    console.log(`   http://127.0.0.1:${port}`);
    console.log(`\n📄 Available pages:`);
    console.log(`   / or /index.html - Main page`);
    console.log(`   /architecture.html - Architecture overview`);
    console.log(`   /codebase.html - Codebase analysis`);
    console.log(`   /canvas-drawing.html - Canvas drawing`);
    console.log(`   /object-manipulation.html - Object manipulation`);
    console.log(`   /imports-exports.html - Imports & exports`);
    console.log(`   /demos.html - Interactive demos`);
    console.log(`   /diagram-guide.html - Understanding diagrams`);
    console.log(`\n🛑 Press Ctrl+C to stop the server`);
});