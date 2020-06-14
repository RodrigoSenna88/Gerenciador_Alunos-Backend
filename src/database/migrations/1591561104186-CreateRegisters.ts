import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRegisters1591561104186
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'registers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'student',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'integer',
          },
          {
            name: 'responsible',
            type: 'varchar',
          },
          {
            name: 'startDate',
            type: 'timestamp with time zone',
          },
          {
            name: 'schedule',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('registers');
  }
}
