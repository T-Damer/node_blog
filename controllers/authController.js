module.exports.signup_get = (request, response) => {
  response.render("signup", { title: "NodeBlog | Signup" });
};

module.exports.login_get = (request, response) => {
  response.render("login", { title: "NodeBlog | Login" });
};

module.exports.signup_post = async (request, response) => {
  response.send("new signup", { title: "NodeBlog | Signup" });
};

module.exports.login_post = async (request, response) => {
  response.send("user login", { title: "NodeBlog | Login" });
};
