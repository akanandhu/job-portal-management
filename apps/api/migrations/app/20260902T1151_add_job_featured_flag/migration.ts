#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e00643b1440dc408036df7bdf94946a3df9e7631607856d979be26bbc89ca3de/contract';
import endContract from '../../snapshots/e00643b1440dc408036df7bdf94946a3df9e7631607856d979be26bbc89ca3de/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/eec986ef470247de29e868a602e998e8899ddd5292bac55aa071522df9ca31f2/contract';
import startContract from '../../snapshots/eec986ef470247de29e868a602e998e8899ddd5292bac55aa071522df9ca31f2/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'job',
        column: col('isFeatured', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'job',
        index: 'job_isFeatured_status_createdAt_idx_7db32ec7',
        columns: ['isFeatured', 'status', 'createdAt'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
