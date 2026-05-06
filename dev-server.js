const fs = require("fs");
const http = require("http");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const root = process.cwd();
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

http.createServer((request, response) => {
  const cleanUrl = decodeURIComponent(request.url.split("?")[0]);
  const relativeFile = cleanUrl === "/" ? "index.html" : cleanUrl.replace(/^\/+/, "");
  const fullPath = path.join(root, relativeFile);

  if (!fullPath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(fullPath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(fullPath)] || "application/octet-stream"
    });
    response.end(data);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`ILM Agency OS: http://127.0.0.1:${port}`);
});
