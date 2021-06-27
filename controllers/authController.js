const User = require("../models/User");

const handleErrors = (err) => {
  console.log(err.message, err.code); // err.code to check if email is unique
  let errors = { email: "", password: "" };

  // Duplicate error code 11000
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // Validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_get = (request, response) => {
  response.render("signup", { title: "NodeBlog | Signup" });
};

module.exports.login_get = (request, response) => {
  response.render("login", { title: "NodeBlog | Login" });
};

module.exports.signup_post = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.create({ email, password });
    response.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    response.status(400).json({ errors });
  }
};

module.exports.login_post = async (request, response) => {
  const { email, password } = request.body;
  console.log(email, password);
  response.status(201).send("New login"); //
};
