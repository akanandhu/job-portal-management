#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/61860d10ed54bdc50f5428bd123586319f724537011628f6120fbd9151fd243a/contract';
import startContract from '../../snapshots/61860d10ed54bdc50f5428bd123586319f724537011628f6120fbd9151fd243a/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/eec986ef470247de29e868a602e998e8899ddd5292bac55aa071522df9ca31f2/contract';
import endContract from '../../snapshots/eec986ef470247de29e868a602e998e8899ddd5292bac55aa071522df9ca31f2/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('currentCompany', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('currentRole', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('education', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('expectedSalary', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('noticePeriodDays', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('skills', 'text[]', {
          notNull: true,
          default: lit([]),
          codecRef: { codecId: 'pg/text@1', many: true },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('yearsOfExperience', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'application',
        constraint: 'application_skills_elem_not_null_79c19a4f',
        expression: 'array_position("skills", NULL) IS NULL',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
