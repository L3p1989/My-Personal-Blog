import { Query } from "../index";

const all = async () => Query(`select * from authors`);

const findOneByEmail = async (email: string) =>
  Query(`select * from authors where email = '${email}' limit 1`);

const findOneByID = async (id: number) =>
  Query(`select * from authors where id = '${id}' limit 1`);

export default {
  all,
  findOneByEmail,
  findOneByID
};
