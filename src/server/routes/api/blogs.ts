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

router.get("/blogs", async (req, res, next) => {
  try {
    let blogs = await DB.blogs.all();
    res.send(blogs);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/blogs/:id", isAdmin, async (req, res, next) => {
  let id = req.params.id;
  try {
    let blog = await DB.blogs.one(id);
    res.send(blog);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
