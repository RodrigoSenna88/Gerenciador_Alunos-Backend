import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddManagerField1591893738156 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('registers', new TableColumn({
        name: 'manager',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('registers', new TableForeignKey({
      name: 'RegisterManager',
      columnNames: ['manager'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('registers', 'RegisterManager' );

      await queryRunner.dropColumn('registers', 'manager');
    }

}
