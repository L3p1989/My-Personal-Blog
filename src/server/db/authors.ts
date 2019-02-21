import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("select * from Authors", (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

export default {
  all
};
