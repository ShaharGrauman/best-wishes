const uuid = require("uuid/v4");

const { anonymous, auth } = require("./middlewares");
const {
  validateNewUser,
  validateLogin,
  validateEvent,
  validateWish
} = require("./validators");

let server, db, router;

const routing = (srv, database, router) => {
  server = srv;
  db = database;

  router.post("/login", login);
  router.post("/register", register);

  router.get("/event/:id", event);

  router.post("/new-wish/:eventId", createWish);

  router.use("/user", auth);

  router.get("/user/my-events", myEvents);

  router.post("/user/new-event", createEvent);

  router.post("/user/new-wish/:eventId", createWish);

  server.use("/", router);
};

const login = async (req, res, next) => {
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
    return;
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
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = {
    id: uuid(),
    username,
    email,
    password
  };

  const valid = await validateNewUser(newUser);

  if (!valid) {
    res.json({
      status: {
        code: 400
      },
      error: "Invalid data"
    });
    return;
  }

  const users = db
    .get("users")
    .push(newUser)
    .write();

  if (!users) {
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
      userId: users[users.length - 1].id
    });
  }
};

const event = (req, res, next) => {
  const event = db
    .get("events")
    .filter({ id: req.params.id })
    .value();
  res.json(event);
};

const myEvents = (req, res, next) => {
  const events = db
    .get("events")
    .filter({ userId: req.userId })
    .value();
  res.json(events);
};

const createEvent = async (req, res, next) => {
  const { title, category, startDate, endDate, location } = req.body;

  const newEvent = {
    id: uuid(),
    userId: req.userId,
    title,
    category,
    startDate,
    endDate,
    location
  };

  const valid = await validateEvent(newEvent);

  if (!valid) {
    res.json({
      status: {
        code: 400
      },
      error: "Invalid data"
    });
    return;
  }

  newEvent.wishes = [];

  const events = db
    .get("events")
    .push(newEvent)
    .write();

  if (!events) {
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
      eventId: events[events.length - 1].id
    });
  }
};

const createWish = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    res.json({
      status: {
        code: 400
      },
      error: "Event id was not supplied"
    });
    return;
  }

  const event = db
    .get("events")
    .find({ id: eventId })
    .value();

  if (!event) {
    res.json({
      status: {
        code: 404
      },
      error: 'No such event'
    });
    return;
  }

  const { from, body, image } = req.body;

  const newWish = {
    id: uuid(),
    userId: req.userId || "00000000-0000-0000-0000-000000000000",
    from,
    body,
    image
  };

  const valid = await validateWish(newWish);

  if (!valid) {
    res.json({
      status: {
        code: 400
      },
      error: "Invalid data"
    });
    return;
  }

  const wishes = db
    .get("events")
    .find({id: eventId})
    .get('wishes')
    .push(newWish)
    .write();

  if (!event) {
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
      wishId: wishes[wishes.length - 1].id
    });
  }
};

module.exports = {
  routing
};
