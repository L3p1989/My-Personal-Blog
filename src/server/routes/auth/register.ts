import * as express from "express";

import DB from "../../db";
import { HashPassword } from "../../utilities/security/passwords";
import { CreateToken } from "../../utilities/security/tokens";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user = req.body;
    user.password = HashPassword(req.body.password);
    let result: any = await DB.authors.insert(user);
    let token = await CreateToken({ userid: result.insertId });
    res.json({
      token,
      role: "guest",
      userid: result.insert
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
