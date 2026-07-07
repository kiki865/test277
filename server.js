const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '127.0.0.1';
const PORT = 4173;
const ROOT = __dirname;
const SESSION_PATH = path.join(ROOT, 'ann-local-progress.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function defaultSession() {
  return {
    name: 'Ann',
    updatedAt: new Date().toISOString(),
    state: {
      days: {},
      wrongWords: {},
      wrongWordStats: {},
      errorEvents: [],
      fixedWords: {},
      totalCorrect: 0,
      totalWrong: 0,
    },
  };
}

function ensureSessionFile() {
  if (!fs.existsSync(SESSION_PATH)) {
    fs.writeFileSync(SESSION_PATH, JSON.stringify(defaultSession(), null, 2));
  }
}

function readSession() {
  ensureSessionFile();
  try {
    return JSON.parse(fs.readFileSync(SESSION_PATH, 'utf8'));
  } catch (error) {
    const fresh = defaultSession();
    fs.writeFileSync(SESSION_PATH, JSON.stringify(fresh, null, 2));
    return fresh;
  }
}

function writeSession(payload) {
  const session = {
    ...defaultSession(),
    ...payload,
    updatedAt: new Date().toISOString(),
    state: {
      ...defaultSession().state,
      ...(payload && payload.state ? payload.state : {}),
    },
  };
  fs.writeFileSync(SESSION_PATH, JSON.stringify(session, null, 2));
  return session;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function sendFile(reqPath, res) {
  const cleanPath = reqPath === '/' ? '/index.html' : reqPath;
  const resolved = path.normalize(path.join(ROOT, cleanPath));
  if (!resolved.startsWith(ROOT)) {
    sendJson(res, 403, { error: 'forbidden' });
    return;
  }

  fs.readFile(resolved, (error, buffer) => {
    if (error) {
      sendJson(res, 404, { error: 'not_found' });
      return;
    }
    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(buffer);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/session' && req.method === 'GET') {
    sendJson(res, 200, readSession());
    return;
  }

  if (url.pathname === '/api/session' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        sendJson(res, 200, writeSession(payload));
      } catch (error) {
        sendJson(res, 400, { error: 'invalid_json' });
      }
    });
    return;
  }

  sendFile(url.pathname, res);
});

server.listen(PORT, HOST, () => {
  console.log(`MOSA local server running at http://${HOST}:${PORT}`);
});
