#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3c226e41b464abd212795f9510b6d24875e1f861d047442474dec004bfca6bb2/contract';
import endContract from '../../snapshots/3c226e41b464abd212795f9510b6d24875e1f861d047442474dec004bfca6bb2/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/4f19e5f590b89ccf29603838521eb96febf7e1007ed5e413c1273329c06278d0/contract';
import startContract from '../../snapshots/4f19e5f590b89ccf29603838521eb96febf7e1007ed5e413c1273329c06278d0/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

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
        column: col('skills', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'application',
        column: col('yearsOfExperience', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
