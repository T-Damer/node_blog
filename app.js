const express = require("express");
const favicon = require("serve-favicon");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// MongoDB Setup
const dbURI =
  "mongodb+srv://admin:psdenxsx303@cluster0.yq88b.mongodb.net/node-blog-main?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Register View engine and favicon
app.set("view engine", "ejs");
app.use(favicon(__dirname + "/public/favicon.ico"));

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // To accept data
app.use(morgan("dev"));

//
app.use((request, response, next) => {
  response.locals.path = require.path;
  next();
});

// Handling Routes
app.get("/", (request, response) => {
  response.render("home", { title: "NodeBlog | Home" });
});

app.get("/about", (request, response) => {
  response.render("about", { title: "NodeBlog | About" });
});

// Blog Routes
app.use("/blogs", blogRoutes); // First parameter check, if we're in /blogs route
// Auth Routes
app.use("/auth", authRoutes);

// Handling 404 only if request reaches this point. DON'T MOVE UPPER
app.use((request, response) => {
  response.status(404).render("err404", { title: "NodeBlog | 404" });
});
