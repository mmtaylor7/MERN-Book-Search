const jwt = require("jsonwebtoken");

const secret = "mytestsecret";
const expiration = "2h";

module.exports = {
  authMiddleware: ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const res = jwt.verify(token, secret, { maxAge: expiration });
      req.user = res.data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  jwtToken: ({ username, email, _id }) => {
    return jwt.sign({ data: { username, email, _id } }, secret, {
      expiresIn: expiration,
    });
  },
};
