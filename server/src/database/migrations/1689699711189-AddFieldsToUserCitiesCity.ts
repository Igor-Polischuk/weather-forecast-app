import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFieldsToUserCitiesCity1689699711189
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_cities_city" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cities_city" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cities_city" ADD "id" SERIAL NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_cities_city" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user_cities_city" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_cities_city" DROP COLUMN "created_at"`,
    );
  }
}
