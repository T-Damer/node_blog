const jwt = require("jsonwebtoken");

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

module.exports = { requireAuth };
