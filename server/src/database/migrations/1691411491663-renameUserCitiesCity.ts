import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserCitiesCity1691411491663 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user_cities_city', 'user_city');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user_city', 'user_cities_city');
  }
}
