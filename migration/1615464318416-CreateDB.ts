import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDB1615464318416 implements MigrationInterface {
    name = 'CreateDB1615464318416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "roles" varchar CHECK( roles IN ('user','admin') ) NOT NULL DEFAULT ('user'), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( type IN ('type1','type2','type3') ) NOT NULL DEFAULT ('type1'), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "managerId" varchar, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "contributors_projects" ("projectsId" varchar NOT NULL, "usersId" varchar NOT NULL, PRIMARY KEY ("projectsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1d38181587cae1b47baba6e22b" ON "contributors_projects" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_821856176fda16dcf13fd9e4df" ON "contributors_projects" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "temporary_projects" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( type IN ('type1','type2','type3') ) NOT NULL DEFAULT ('type1'), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "managerId" varchar, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"), CONSTRAINT "FK_239dec66b26610938a98a7b7bd3" FOREIGN KEY ("managerId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_projects"("id", "name", "type", "createdDate", "updatedDate", "managerId") SELECT "id", "name", "type", "createdDate", "updatedDate", "managerId" FROM "projects"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`ALTER TABLE "temporary_projects" RENAME TO "projects"`);
        await queryRunner.query(`DROP INDEX "IDX_1d38181587cae1b47baba6e22b"`);
        await queryRunner.query(`DROP INDEX "IDX_821856176fda16dcf13fd9e4df"`);
        await queryRunner.query(`CREATE TABLE "temporary_contributors_projects" ("projectsId" varchar NOT NULL, "usersId" varchar NOT NULL, CONSTRAINT "FK_1d38181587cae1b47baba6e22bf" FOREIGN KEY ("projectsId") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_821856176fda16dcf13fd9e4df1" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("projectsId", "usersId"))`);
        await queryRunner.query(`INSERT INTO "temporary_contributors_projects"("projectsId", "usersId") SELECT "projectsId", "usersId" FROM "contributors_projects"`);
        await queryRunner.query(`DROP TABLE "contributors_projects"`);
        await queryRunner.query(`ALTER TABLE "temporary_contributors_projects" RENAME TO "contributors_projects"`);
        await queryRunner.query(`CREATE INDEX "IDX_1d38181587cae1b47baba6e22b" ON "contributors_projects" ("projectsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_821856176fda16dcf13fd9e4df" ON "contributors_projects" ("usersId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_821856176fda16dcf13fd9e4df"`);
        await queryRunner.query(`DROP INDEX "IDX_1d38181587cae1b47baba6e22b"`);
        await queryRunner.query(`ALTER TABLE "contributors_projects" RENAME TO "temporary_contributors_projects"`);
        await queryRunner.query(`CREATE TABLE "contributors_projects" ("projectsId" varchar NOT NULL, "usersId" varchar NOT NULL, PRIMARY KEY ("projectsId", "usersId"))`);
        await queryRunner.query(`INSERT INTO "contributors_projects"("projectsId", "usersId") SELECT "projectsId", "usersId" FROM "temporary_contributors_projects"`);
        await queryRunner.query(`DROP TABLE "temporary_contributors_projects"`);
        await queryRunner.query(`CREATE INDEX "IDX_821856176fda16dcf13fd9e4df" ON "contributors_projects" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1d38181587cae1b47baba6e22b" ON "contributors_projects" ("projectsId") `);
        await queryRunner.query(`ALTER TABLE "projects" RENAME TO "temporary_projects"`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "type" varchar CHECK( type IN ('type1','type2','type3') ) NOT NULL DEFAULT ('type1'), "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "managerId" varchar, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "projects"("id", "name", "type", "createdDate", "updatedDate", "managerId") SELECT "id", "name", "type", "createdDate", "updatedDate", "managerId" FROM "temporary_projects"`);
        await queryRunner.query(`DROP TABLE "temporary_projects"`);
        await queryRunner.query(`DROP INDEX "IDX_821856176fda16dcf13fd9e4df"`);
        await queryRunner.query(`DROP INDEX "IDX_1d38181587cae1b47baba6e22b"`);
        await queryRunner.query(`DROP TABLE "contributors_projects"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
