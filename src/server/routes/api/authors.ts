import * as express from "express";

import DB from "../../db";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let authors = await DB.authors.all();
    res.json(authors);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  try {
    let authors = await DB.authors.insert(req.body);
    res.json({ message: "New guest successfully created!" });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
