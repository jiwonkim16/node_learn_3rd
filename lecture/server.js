const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<p>Hello server!</p>");
  res.end("<p>Hello Won</p>");
});

server.listen(8080);
server.on("listening", () => {
  console.log("8080번 포트에서 서버 대기 중");
});

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<p>Hello server!</p>");
    res.end("<p>Hello Won</p>");
  })
  .listen(8081, () => {
    console.log("8081번 포트에서 서버 대기 중");
  });
