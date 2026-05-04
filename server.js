const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 8080);
const ROOT = process.cwd();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function safeResolvePath(requestUrl) {
  const parsed = new URL(requestUrl, "http://localhost");
  const rawPath = decodeURIComponent(parsed.pathname);
  const normalizedPath = rawPath === "/" ? "/index.html" : rawPath;
  const resolvedPath = path.resolve(ROOT, "." + normalizedPath);

  if (!resolvedPath.startsWith(ROOT)) {
    return null;
  }

  return resolvedPath;
}

function sendResponse(response, statusCode, body, contentType) {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-store"
  });
  response.end(body);
}

function serveFile(filePath, response) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      sendResponse(
        response,
        404,
        "Not found. Open /index.html or visit http://localhost:8080/.\n",
        "text/plain; charset=utf-8"
      );
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || "application/octet-stream";

    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", () => {
      sendResponse(response, 500, "Failed to read file.\n", "text/plain; charset=utf-8");
    });
    stream.pipe(response);
  });
}

const server = http.createServer((request, response) => {
  const filePath = safeResolvePath(request.url || "/");

  if (!filePath) {
    sendResponse(response, 403, "Forbidden.\n", "text/plain; charset=utf-8");
    return;
  }

  serveFile(filePath, response);
});

server.on("error", (error) => {
  if (error && error.code === "EADDRINUSE") {
    console.error("Port 8080 is already in use. If UmmahPlay is already running, open http://localhost:8080/.");
    process.exit(1);
  }

  console.error(error);
  process.exit(1);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("UmmahPlay running at http://localhost:" + PORT + "/");
});
