import * as express from "express";

import DB from "./db";

const router = express.Router();

router.get("/api/blogs", async (req, res) => {
  try {
    let blogs = await DB.blogs.all();
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/blogs/:id", async (req, res) => {
  try {
    let blog = await DB.blogs.one(req.params.id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/api/blogs", async (req, res) => {
  try {
    let blogs = await DB.blogs.insert(req.body);
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/api/blogs/:id", async (req, res) => {
  try {
    let blog = await DB.blogs.deleteBlog(req.params.id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/api/blogs/:id", async (req, res) => {
  let id = req.params.id;
  let blog = req.body;
  try {
    let placeholderColumns = Object.keys(blog).map(key => [
      `${key}="${blog[key]}"`
    ]);
    let updateBlog = placeholderColumns.join(", ");
    await DB.blogs.editBlog(updateBlog, id);
    res.json("edit success!");
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/api/authors", async (req, res) => {
  try {
    let authors = await DB.authors.all();
    res.json(authors);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
