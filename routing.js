const uuid = require("uuid/v4");

const { anonymous, auth } = require("./middlewares");
const { validateNewUser, validateLogin } = require("./validators");

let server, db;

const routing = (srv, database) => {
  server = srv;
  db = database;
  login();
  register();

  auth(server);

  events();
};

const login = () => {
  server.post("/login", async (req, res, next) => {
    const loginUser = {
      email: req.body.email,
      password: req.body.password
    };
    const valid = await validateLogin(loginUser);

    if (!valid) {
      res.json({
        status: {
          code: 400
        },
        error: "Invalid data"
      });
    }
    try {
      const user = db
        .get("users")
        .find(loginUser)
        .value();

      if (!user) {
        res.json({
          status: {
            code: 404,
            error: "Invalid Email or Password"
          }
        });
      } else {
        res.json({
          status: {
            code: 200
          },
          userId: user.id
        });
      }
    } catch (err) {}
  });
};

const register = () => {
  server.post("/register", async (req, res, next) => {
    const newUser = {
      id: uuid(),
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    const valid = await validateNewUser(newUser);

    if (!valid) {
      res.json({
        status: {
          code: 400
        },
        error: "Invalid data"
      });
    }

    const user = db
      .get("users")
      .push(newUser)
      .write();

    if (!user) {
      res.json({
        status: {
          code: 500
        },
        error: "Internal server error"
      });
    } else {
      res.json({
        status: {
          code: 200
        },
        userId: user[0].id
      });
    }
  });
};

const events = () => {
  server.get("/events", (req, res, next) => {
    const events = db
      .get("events")
      .filter({ userId: req.userId })
      .value();
    res.json(events);
  });
};

module.exports = {
  routing
};
