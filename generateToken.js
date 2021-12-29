const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  //Give some value to your JWT_SECRET.

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;