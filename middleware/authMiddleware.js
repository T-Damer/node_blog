const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Use this, to check if user is authenticated
const requireAuth = (request, response, next) => {
  const token = request.cookies.jwt;

  // Check json web token exists & is verified
  if (token) {
    //  WARNING: DONT PUBLISH THIS! PROTECTED SECRET!
    jwt.verify(token, "eGCFxjGnwaR2sH7VCThK", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        response.redirect("/auth/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    response.redirect("/auth/login");
  }
};

// Check current user
const checkUser = (request, response, next) => {
  const token = request.cookies.jwt;
  if (token) {
    //  WARNING: DONT PUBLISH THIS! PROTECTED SECRET!
    jwt.verify(token, "eGCFxjGnwaR2sH7VCThK", async (err, decodedToken) => {
      if (err) {
        response.locals.user = null; // Careful with that
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        response.locals.user = user;
        next();
      }
    });
  } else {
    response.locals.user = null; // Careful with that
    next();
  }
};

module.exports = { requireAuth, checkUser };
