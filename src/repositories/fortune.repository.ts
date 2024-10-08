import { Insertable, sql } from "kysely";

import { DB, BaseRepository } from "../bases";

class FortuneRepository extends BaseRepository {
  public async getAll() {
    const result = await this.database
      .selectFrom("cookies")
      .selectAll()
      .execute();

    return result;
  }

  public async getById(id: string) {
    const result = await this.database
      .selectFrom("cookies")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return result;
  }

  public async getRandom() {
    const result = await this.database
      .selectFrom("cookies")
      .selectAll()
      .orderBy(sql`RANDOM()`)
      .executeTakeFirstOrThrow();

    return result;
  }

  public async create(
    cookie: Insertable<DB["cookies"]> | Insertable<DB["cookies"]>[]
  ) {
    const result = await this.database
      .insertInto("cookies")
      .values(cookie)
      .execute();

    return result;
  }
}

export const FortuneRepositoryInstance = new FortuneRepository();
