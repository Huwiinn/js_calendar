const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
}

const root = process.cwd();

const server = http.createServer((req, res) => {
    let filePath = path.join(root, req.url === '/' ? 'index.html' : req.url);

    try {
        const stat = fs.statSync(filePath);

        if(stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }

        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, {'Content-Type': contentType});

        fs.createReadStream(filePath).pipe(res);
    } catch(error) {
        console.log(`error : ${error.message}`);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
})

server.listen(3000, () => {
    console.log('Listening on port 3000');
})

