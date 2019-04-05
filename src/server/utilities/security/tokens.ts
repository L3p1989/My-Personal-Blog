import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

import config from "../../config";
import DB from "../../db";

export const CreateToken = async (payload: iPayload) => {
  let tokenid: any = await DB.tokens.insert(payload.userid);
  payload.accesstokenid = tokenid.insertId;
  payload.unique = crypto.randomBytes(32).toString("hex");
  let token = await jwt.sign(payload, config.auth.secret);
  await DB.tokens.update(payload.accesstokenid, token);
  return token;
};

export const ValidToken = async (token: string) => {
  let payload: any = <iPayload>jwt.decode(token);
  let [accesstokenid] = await DB.tokens.findOne(payload.accesstokenid, token);
  // [ { accesstokenid } ]
  if (!accesstokenid) {
    throw new Error("Invalid Token!");
  } else return payload;
};

export interface iPayload {
  [key: string]: any;
  userid: number;
  unique?: string;
}
