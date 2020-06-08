import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateRegisters1591561104186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'registers',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'name',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'phone',
                type: 'integer',
                isNullable: false,
              },
              {
                name: 'responsable',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'startDate',
                type: 'timestamp with time zone',
                isNullable: false,
              },
              {
                name: 'schedule',
                type: 'varchar',
                isNullable: false,
              },
            ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('registers')
    }

}
