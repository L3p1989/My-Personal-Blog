import { Query } from "../index";

const findOne = async (id: string, token: string) =>
  Query(`select * from tokens where id = '${id}' and token = '${token}'`);

const insert = async (userid: number) =>
  Query(`insert into tokens (userid) value (${userid})`);

const update = async (id: number, token: string) =>
  Query(`update tokens set token = '${token}' where id = ${id}`);

export default {
  findOne,
  insert,
  update
};
