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
    Connection.query(
      `select b.*, a.name as authorid from blogs b join authors a on b.authorid = a.id where b.id = ?`,
      [id],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res[0]);
      }
    );
  });
};

export const insert = async (values: any) => {
  return new Promise((resolve, reject) => {
    Connection.query(`insert into Blogs set ?`, values, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

export const deleteBlog = async (id: number) => {
  return new Promise((resolve, reject) => {
    Connection.query(`delete from Blogs where id = ?`, id, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

export const editBlog = async (values: any, id: number) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `update Blogs set ${values} where id = ?`,
      id,
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

export default {
  all,
  one,
  insert,
  deleteBlog,
  editBlog
};
