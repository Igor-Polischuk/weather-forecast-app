import { MigrationInterface, QueryRunner } from 'typeorm';

const tables = ['city', 'refresh_token', 'user', 'user_city'];

export class RenameTimestampColumns1691411914738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      await queryRunner.query(
        `ALTER TABLE "${table}" RENAME COLUMN "created_at" TO "createdAt"`,
      );
      await queryRunner.query(
        `ALTER TABLE "${table}" RENAME COLUMN "updated_at" TO "updatedAt"`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const table of tables) {
      await queryRunner.query(
        `ALTER TABLE "${table}" RENAME COLUMN "createdAt" TO "created_at"`,
      );
      await queryRunner.query(
        `ALTER TABLE "${table}" RENAME COLUMN "updatedAt" TO "updated_at"`,
      );
    }
  }
}
