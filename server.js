
const { initServer, initDB } = require("./init");

const server = initServer();
const db = initDB();


const { routing } = require('./routing');

routing(server, db);


server.listen(3080, () => console.log("SERVER is running on port 3080"));

// const router = jsonServer.router("db.json");
// const middlewares = jsonServer.defaults({
//     noCors: true
// });

// const { anonymous, auth } = require("./middlewares");
// anonymous(server);
// // auth(server);

// server.use(middlewares);

// server.use(jsonServer.bodyParser);

// server.post("/login", (req, res, next) => {
//     req.url = `/users?email=${req.body.email}`;
//     req.method = 'get';
//     console.log(req.url);
//     server._router.handle(req, res, next);

//     // res.json({
//     // status: {
//     //   code: 200,
//     //   userToken: 1
//     // }
// //   });
// });

// // server.get('/users', (req, res, next) => {
// //     res.json(req.params);
// // })

// server.post("/lala", (req, res) => {
//   res.json({
//     reqHeaders: req.header("authorization"),
//     reqBody: req.body,
//     reqParams: req.query,
//     reqUrl: req.path
//   });
// });

// server.post("/categories", (req, res, next) => {
//   next();
// });

// server.use(router);

// server.listen(3080, () => console.log("SERVER is running on port 3080"));
