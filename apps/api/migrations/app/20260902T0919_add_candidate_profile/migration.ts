#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/19a1051dbde03517400660e5256c54cb5ef79a1d08f7137588a3fd09b131b617/contract';
import startContract from '../../snapshots/19a1051dbde03517400660e5256c54cb5ef79a1d08f7137588a3fd09b131b617/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/4f19e5f590b89ccf29603838521eb96febf7e1007ed5e413c1273329c06278d0/contract';
import endContract from '../../snapshots/4f19e5f590b89ccf29603838521eb96febf7e1007ed5e413c1273329c06278d0/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'candidateProfile',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('currentCompany', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('currentRole', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('education', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('expectedSalary', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('noticePeriodDays', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('skills', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('yearsOfExperience', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'candidateProfile',
        constraint: 'candidateProfile_userId_key',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'candidateProfile',
        foreignKey: {
          name: 'candidateProfile_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'user', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
