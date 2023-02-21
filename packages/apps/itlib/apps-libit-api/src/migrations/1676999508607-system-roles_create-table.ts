import { MigrationInterface, QueryRunner } from 'typeorm';

export class systemRolesCreateTable1676999508607 implements MigrationInterface {
  name = 'systemRolesCreateTable1676999508607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "system_roles" (
                "id" varchar PRIMARY KEY NOT NULL,
                "name" varchar NOT NULL,
                CONSTRAINT "UQ_e17f07bcbed1c457ff7fcc13797" UNIQUE ("name")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users__system_roles" (
                "userId" varchar NOT NULL,
                "systemRoleId" varchar NOT NULL,
                PRIMARY KEY ("userId", "systemRoleId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_1cbf844624dcd244a10fad9c01" ON "users__system_roles" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_02253b20f6774377684e3beaab" ON "users__system_roles" ("systemRoleId")
        `);
    await queryRunner.query(`
            CREATE TABLE "temporary_users" (
                "id" varchar PRIMARY KEY NOT NULL,
                "username" varchar,
                "email" varchar NOT NULL,
                "phoneNumber" varchar,
                "password" varchar NOT NULL,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber")
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_users"(
                    "id",
                    "username",
                    "email",
                    "phoneNumber",
                    "password"
                )
            SELECT "id",
                "username",
                "email",
                "phoneNumber",
                "password"
            FROM "users"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
    await queryRunner.query(`
            ALTER TABLE "temporary_users"
                RENAME TO "users"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_1cbf844624dcd244a10fad9c01"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_02253b20f6774377684e3beaab"
        `);
    await queryRunner.query(`
            CREATE TABLE "temporary_users__system_roles" (
                "userId" varchar NOT NULL,
                "systemRoleId" varchar NOT NULL,
                CONSTRAINT "FK_1cbf844624dcd244a10fad9c012" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "FK_02253b20f6774377684e3beaab1" FOREIGN KEY ("systemRoleId") REFERENCES "system_roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY ("userId", "systemRoleId")
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_users__system_roles"("userId", "systemRoleId")
            SELECT "userId",
                "systemRoleId"
            FROM "users__system_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "users__system_roles"
        `);
    await queryRunner.query(`
            ALTER TABLE "temporary_users__system_roles"
                RENAME TO "users__system_roles"
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_1cbf844624dcd244a10fad9c01" ON "users__system_roles" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_02253b20f6774377684e3beaab" ON "users__system_roles" ("systemRoleId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "IDX_02253b20f6774377684e3beaab"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_1cbf844624dcd244a10fad9c01"
        `);
    await queryRunner.query(`
            ALTER TABLE "users__system_roles"
                RENAME TO "temporary_users__system_roles"
        `);
    await queryRunner.query(`
            CREATE TABLE "users__system_roles" (
                "userId" varchar NOT NULL,
                "systemRoleId" varchar NOT NULL,
                PRIMARY KEY ("userId", "systemRoleId")
            )
        `);
    await queryRunner.query(`
            INSERT INTO "users__system_roles"("userId", "systemRoleId")
            SELECT "userId",
                "systemRoleId"
            FROM "temporary_users__system_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "temporary_users__system_roles"
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_02253b20f6774377684e3beaab" ON "users__system_roles" ("systemRoleId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_1cbf844624dcd244a10fad9c01" ON "users__system_roles" ("userId")
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
                RENAME TO "temporary_users"
        `);
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" varchar PRIMARY KEY NOT NULL,
                "username" varchar,
                "email" varchar NOT NULL,
                "phoneNumber" varchar,
                "password" varchar NOT NULL,
                "testField" varchar,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber")
            )
        `);
    await queryRunner.query(`
            INSERT INTO "users"(
                    "id",
                    "username",
                    "email",
                    "phoneNumber",
                    "password"
                )
            SELECT "id",
                "username",
                "email",
                "phoneNumber",
                "password"
            FROM "temporary_users"
        `);
    await queryRunner.query(`
            DROP TABLE "temporary_users"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_02253b20f6774377684e3beaab"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_1cbf844624dcd244a10fad9c01"
        `);
    await queryRunner.query(`
            DROP TABLE "users__system_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "system_roles"
        `);
  }
}
