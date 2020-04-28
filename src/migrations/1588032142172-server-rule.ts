import {MigrationInterface, QueryRunner} from "typeorm";

export class serverRule1588032142172 implements MigrationInterface {
    name = 'serverRule1588032142172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rule_model" ("id" character varying NOT NULL, "ruleConsent" boolean NOT NULL, CONSTRAINT "PK_b0faf208db9fc9ae7a92fc21cec" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" ADD "ruleChannelId" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" ADD "ruleVerify" boolean NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_settings" DROP COLUMN "ruleVerify"`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" DROP COLUMN "ruleChannelId"`, undefined);
        await queryRunner.query(`DROP TABLE "rule_model"`, undefined);
    }

}
