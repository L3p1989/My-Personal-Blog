import * as mysql from "mysql";
import config from "../config";

import blogs from "./queries/blogs";
import authors from "./queries/authors";
import tokens from "./queries/tokens";

export const Connection = mysql.createConnection(config.mysql);

export const Query = (query: string, values?: Array<string | number>) => {
  return new Promise<Array<any>>((resolve, reject) => {
    Connection.query(query, values, (err, results) => {
      if (err) reject(err);
      return resolve(results);
    });
  });
};

Connection.connect(err => {
  if (err) console.log(err);
});

export default {
  blogs,
  authors,
  tokens
};
