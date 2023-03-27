import { MigrationInterface, QueryRunner } from 'typeorm';

export class systemRolesCreateTable1677416671331 implements MigrationInterface {
  name = 'systemRolesCreateTable1677416671331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "system_roles" (
                "id" SERIAL NOT NULL,
                "name" character varying(64) NOT NULL,
                CONSTRAINT "UQ_e17f07bcbed1c457ff7fcc13797" UNIQUE ("name"),
                CONSTRAINT "PK_468b99ca2261e84113b6ec40814" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "users__system_roles" (
                "user_id" integer NOT NULL,
                "system_role_id" integer NOT NULL,
                CONSTRAINT "PK_d5203b1b726dce75979d18cfed9" PRIMARY KEY ("user_id", "system_role_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_2b861adea8545e2102db224221" ON "users__system_roles" ("user_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_f9df93154fc2f47f4cfdb2f725" ON "users__system_roles" ("system_role_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "users__system_roles"
            ADD CONSTRAINT "FK_2b861adea8545e2102db2242210" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "users__system_roles"
            ADD CONSTRAINT "FK_f9df93154fc2f47f4cfdb2f725c" FOREIGN KEY ("system_role_id") REFERENCES "system_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users__system_roles" DROP CONSTRAINT "FK_f9df93154fc2f47f4cfdb2f725c"
        `);
    await queryRunner.query(`
            ALTER TABLE "users__system_roles" DROP CONSTRAINT "FK_2b861adea8545e2102db2242210"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_f9df93154fc2f47f4cfdb2f725"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_2b861adea8545e2102db224221"
        `);
    await queryRunner.query(`
            DROP TABLE "users__system_roles"
        `);
    await queryRunner.query(`
            DROP TABLE "system_roles"
        `);
  }
}
