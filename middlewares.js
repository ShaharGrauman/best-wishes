const anonymous = (req, res, next) => {
  req.anonymous = true;
  next();
};

const authorize = req => {
  const auth = req.header("authorization");

  if (!auth) return false;

  const parts = auth.split(" ");

  if (
    parts.length !== 2 ||
    parts[0] !== "Bearer" ||
    !parts[1].startsWith("userId")
  ) {
    return false;
  }

  const userId = parts[1].slice(parts[1].indexOf(":") + 1);

  return (
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
      userId
    ) && userId
  );
};

const auth = (req, res, next) => {
  if (req.anonymous) {
    next();
    return;
  }

  const userId = authorize(req);
  if (userId) {
    req.userId = userId;
    next();
  } else {
    res.status(401).json({
      status: {
        code: 401,
        message: "Not Authorized"
      }
    });
  }
};

module.exports = {
  anonymous,
  auth
};
