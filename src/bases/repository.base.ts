import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

import { DB } from "./db.schema";

export class BaseRepository {
  private readonly dialect = new PostgresDialect({
    pool: new Pool({
      max: 10,
      connectionString: process.env["DATABASE_URL"],
    }),
  });
  protected readonly database = new Kysely<DB>({
    dialect: this.dialect,
  });
}

