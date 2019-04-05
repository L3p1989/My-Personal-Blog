import * as express from "express";

import DB from "../../db";
import { RequestHandler } from "express-serve-static-core";

const router = express.Router();

const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.sendStatus(401);
  } else {
    return next();
  }
};

router.get("/", async (req, res) => {
  try {
    let blogs = await DB.blogs.all();
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let blog = await DB.blogs.one(req.params.id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    let blogs = await DB.blogs.insert(req.body);
    res.json(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    let blog = await DB.blogs.deleteBlog(req.params.id);
    res.json(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/:id", isAdmin, async (req, res) => {
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

export default router;
