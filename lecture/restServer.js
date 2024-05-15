const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    // 서버를 생성, 코드 최하단에 보면 8082포트를 지정
    // 요청이 오면 서버는 응답을 해야한다.
    try {
      // 요청의 메서드가 get일 경우
      if (req.method === "GET") {
        // 요청의 url이 localhost:8082/ 일 경우, restFront.html 파일을 읽어서 전달을 해준다.
        if (req.url === "/") {
          const data = await fs.readFile(
            path.join(__dirname, "restFront.html")
          );
          // writeHead의 200은 http 응답 코드 200을 의미
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);

          // 요청의 url이 /about일 경우, about.html을 전달
        } else if (req.url === "/about") {
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
          // 요청의 url이 /users일 경우, users의 데이터를 JSON 형식으로 변환해서 전달한다.
        } else if (req.url === "/users") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8", // html이 아니라 json형식으로 보내겠다는 의미.
          });
          return res.end(JSON.stringify(users));
        }
        // /도 /about도 /users도 아니면 폴더에서 css나 js파일을 찾아서 보내준다.
        try {
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
        // 요청의 메서드가 post이며, 요청 url이 user일 경우,
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          // 청크들을 모아서
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨.
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body); // body로 모은 것을 JSON.parse하면 name이 된다.
            const id = Date.now(); // 사용자를 등록했을 때, id는 현재 시간으로,
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" }); // 응답코드 201은 성공적으로 생성되었다는 의미.
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        // 요청 메서드가 put인 경우
        if (req.url.startsWith("/user/")) {
          // url의 시작이 /user/ 인 경우, /user/ 이후엔 아이디가 들어옴.
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        // 요청 메서드가 delete인 경우,
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
      // 요청을 했는데 서버가 그 요청에 대한 내용을 찾지 못했을 때,
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8082, () => {
    console.log("8082번 포트에서 서버 대기 중입니다");
  });
