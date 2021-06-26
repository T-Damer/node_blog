const Blog = require("../models/blogModel");

const blog_index = (request, response) => {
  Blog.find()
    .sort({ createdAt: -1 }) // -1 is From the newest to the oldest
    .then((result) => {
      response.render("blogs/index", { title: "All blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (request, response) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((result) => {
      response.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      response.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (request, response) => {
  response.render("blogs/createBlog", { title: "NodeBlog | Create blog" });
};

const blog_create_post = (request, response) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then((result) => {
      response.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (request, response) => {
  const id = request.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      response.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
