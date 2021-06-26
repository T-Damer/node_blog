const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const rootDir = { root: __dirname };

// MongoDB Setup
const dbURI =
  "mongodb+srv://admin:psdenxsx303@cluster0.yq88b.mongodb.net/node-blog-main?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Register View engine for
app.set("view engine", "ejs");

// Request listener

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // To accept data
app.use(morgan("dev"));

app.use((request, response, next) => {
  response.locals.path = require.path;
  next();
});

// Handling Requests. Routes
app.get("/", (request, response) => {
  response.redirect("/blogs");
});

app.get("/about", (request, response) => {
  response.render("about", { title: "NodeBlog | About" });
});

// Blog Routes
app.use("/blogs", blogRoutes); // First parameter check, if we're in /blogs route

// Handling 404 only if request reaches this point. DON'T MOVE UPPER
app.use((request, response) => {
  response.status(404).render("err404", { title: "NodeBlog | 404" });
});
