import { MigrationInterface, QueryRunner } from "typeorm";

export class LogEntriesCreateTable1717746674333 implements MigrationInterface {
    name = 'LogEntriesCreateTable1717746674333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "log_entries" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "description" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "user_id" integer,
                CONSTRAINT "PK_b226cc4051321f12106771581e0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "log_entries"
            ADD CONSTRAINT "FK_cad9d30ad3f565390a7b73a897f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "log_entries" DROP CONSTRAINT "FK_cad9d30ad3f565390a7b73a897f"
        `);
        await queryRunner.query(`
            DROP TABLE "log_entries"
        `);
    }

}
