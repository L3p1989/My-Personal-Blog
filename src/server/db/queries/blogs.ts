import { Connection, Query } from "../index";

const all = async () => Query(`select * from blogs`);

const one = async (id: number) => {
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

const insert = async (values: any) => Query(`insert into Blogs set ?`, values);

const deleteBlog = async (id: number) =>
  Query(`delete from Blogs where id = ${id}`);

const editBlog = async (values: any, id: number) =>
  Query(`update Blogs set ${values} where id = ${id}`);

export default {
  all,
  one,
  insert,
  deleteBlog,
  editBlog
};
