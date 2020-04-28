import {MigrationInterface, QueryRunner} from "typeorm";

export class serverRuleFix1588032607605 implements MigrationInterface {
    name = 'serverRuleFix1588032607605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_settings" ALTER COLUMN "prefix" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" ALTER COLUMN "ruleChannelId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" ALTER COLUMN "ruleVerify" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild_settings" ALTER COLUMN "ruleVerify" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" ALTER COLUMN "ruleChannelId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "guild_settings" ALTER COLUMN "prefix" SET NOT NULL`, undefined);
    }

}
