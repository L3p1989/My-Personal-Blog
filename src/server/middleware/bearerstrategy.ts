import * as passport from "passport";
import * as BearerStrategy from "passport-http-bearer";

import { ValidToken } from "../utilities/security/tokens";
import DB from "../db";

passport.use(
  new BearerStrategy.Strategy(async (token, done) => {
    try {
      let payload = await ValidToken(token);
      let [user] = await DB.authors.findOneByID(payload.userid);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (e) {
      done(e);
    }
  })
);
