import {MigrationInterface, QueryRunner} from "typeorm";

export class init1586846730949 implements MigrationInterface {
    name = 'init1586846730949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "guild_settings" ("id" character varying NOT NULL, "prefix" character varying NOT NULL, CONSTRAINT "PK_259bd839beb2830fe5c2ddd2ff5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "member_settings" ("id" character varying NOT NULL, CONSTRAINT "PK_5e65635b505b83ecf3b90dfa911" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_settings" ("id" character varying NOT NULL, "langCode" character varying NOT NULL, CONSTRAINT "PK_00f004f5922a0744d174530d639" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "member_settings"`, undefined);
        await queryRunner.query(`DROP TABLE "guild_settings"`, undefined);
    }

}
