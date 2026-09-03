#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3781c338a83c17362347cd086eb735ab92414835fb05422e4768d92fd2f41f45/contract';
import endContract from '../../snapshots/3781c338a83c17362347cd086eb735ab92414835fb05422e4768d92fd2f41f45/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/4d022ac0cb0f4bf62c4e0be712f34f1171c238c4505050d1f1e0d133e117f771/contract';
import startContract from '../../snapshots/4d022ac0cb0f4bf62c4e0be712f34f1171c238c4505050d1f1e0d133e117f771/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setDefault({
        schema: 'public',
        table: 'job',
        column: 'status',
        defaultSql: "DEFAULT 'PUBLISHED'",
        operationClass: 'widening',
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
