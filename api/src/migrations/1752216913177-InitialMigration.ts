import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752216913177 implements MigrationInterface {
    name = 'InitialMigration1752216913177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Task" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "completed" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Task"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
