let http = require("http");
let url = require("url");
let fs = require("fs");

let responder = (req, res, param) => {
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(param);
};

let myFileReader = (filepath, res) => {
  fs.access(filepath, fs.F_OK, (err) => {
    if (err) {
      res.writeHead(404, { "Content-type": "text/html" });
      res.end("<h1>File not found</h1>");
    } else {
      fs.readFile(filepath, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(data);
      });
    }
  });
};

let routes = {
  GET: {
    "/": (req, res) => {
      let filepath = __dirname + "/templates/index.html";
      myFileReader(filepath, res);
    },
    "/index.html": (req, res) => {
      let filepath = __dirname + "/templates/index.html";
      myFileReader(filepath, res);
    },
    "/about.html": (req, res) => {
      let filepath = __dirname + "/templates/about.html";
      myFileReader(filepath, res);
    },
  },
  POST: {
    "/": (req, res) => {
      responder(req, res, `<h1>Post Method => / route</h1>`);
    },
  },
  NA: (req, res) => {
    responder(req, res, `<h1>No page for that route!</h1>`);
  },
};

let start = (req, res) => {
  let reqMethod = req.method;
  let params = url.parse(req.url, true);
  // let name = params.query.name;
  // let age = params.query.age;

  let resolveRoute = routes[reqMethod][params.pathname];

  if (resolveRoute != null && resolveRoute != undefined) {
    resolveRoute(req, res);
  } else {
    routes["NA"](req, res);
  }
};

let server = http.createServer(start);

server.listen(700, () => {
  console.log("Server is running at port 700");
});
