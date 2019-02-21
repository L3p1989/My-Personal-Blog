import { Connection } from "./index";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("select * from blogs;", (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

export const one = async (id: number) => {
  return new Promise((resolve, reject) => {
    Connection.query("select * from blogs where id = ?", [id], (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

export default {
  all,
  one
};
