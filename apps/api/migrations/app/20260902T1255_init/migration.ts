#!/usr/bin/env -S node
import type { Contract as End } from "../../snapshots/4d022ac0cb0f4bf62c4e0be712f34f1171c238c4505050d1f1e0d133e117f771/contract";
import endContract from "../../snapshots/4d022ac0cb0f4bf62c4e0be712f34f1171c238c4505050d1f1e0d133e117f771/contract.json" with { type: "json" };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from "@prisma/orm-postgres/migration";

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: "public" }),
      this.createTable({
        schema: "public",
        table: "application",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("currentCompany", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("currentRole", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("education", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("expectedSalary", "int4", { codecRef: { codecId: "pg/int4@1" } }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("jobId", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("noticePeriodDays", "int4", { codecRef: { codecId: "pg/int4@1" } }),
          col("skills", "text[]", {
            notNull: true,
            default: lit([]),
            codecRef: { codecId: "pg/text@1", many: true },
          }),
          col("status", "text", {
            notNull: true,
            default: lit("APPLIED"),
            codecRef: { codecId: "pg/text@1" },
          }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("userId", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("yearsOfExperience", "int4", { codecRef: { codecId: "pg/int4@1" } }),
        ],
        constraints: [
          primaryKey(["id"]),
          checkExpression(
            "application_skills_elem_not_null_79c19a4f",
            'array_position("skills", NULL) IS NULL',
          ),
          checkExpression(
            "application_status_check_2e856a86",
            "\"status\" IN ('APPLIED', 'REVIEWING', 'REJECTED', 'ACCEPTED')",
          ),
        ],
      }),
      this.createTable({
        schema: "public",
        table: "candidateProfile",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("currentCompany", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("currentRole", "text", { codecRef: { codecId: "pg/text@1" } }),
          col("education", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("expectedSalary", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("noticePeriodDays", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
          col("phone", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("skills", "text[]", {
            notNull: true,
            codecRef: { codecId: "pg/text@1", many: true },
          }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("userId", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("yearsOfExperience", "int4", { notNull: true, codecRef: { codecId: "pg/int4@1" } }),
        ],
        constraints: [
          primaryKey(["id"]),
          checkExpression(
            "candidateProfile_skills_elem_not_null_79c19a4f",
            'array_position("skills", NULL) IS NULL',
          ),
        ],
      }),
      this.createTable({
        schema: "public",
        table: "job",
        columns: [
          col("category", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("company", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("description", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("experienceLevel", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("isFeatured", "bool", {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: "pg/bool@1" },
          }),
          col("location", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("skills", "text[]", {
            notNull: true,
            default: lit([]),
            codecRef: { codecId: "pg/text@1", many: true },
          }),
          col("status", "text", {
            notNull: true,
            default: lit("DRAFT"),
            codecRef: { codecId: "pg/text@1" },
          }),
          col("title", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("workplaceType", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
        ],
        constraints: [
          primaryKey(["id"]),
          checkExpression(
            "job_category_check_1a5e163e",
            "\"category\" IN ('ENGINEERING', 'DESIGN', 'MARKETING', 'SALES', 'FINANCE', 'HUMAN_RESOURCES', 'CUSTOMER_SUPPORT', 'OPERATIONS')",
          ),
          checkExpression(
            "job_experienceLevel_check_d08da914",
            "\"experienceLevel\" IN ('ENTRY', 'MID', 'SENIOR')",
          ),
          checkExpression(
            "job_skills_elem_not_null_79c19a4f",
            'array_position("skills", NULL) IS NULL',
          ),
          checkExpression(
            "job_status_check_9e246da7",
            "\"status\" IN ('DRAFT', 'PUBLISHED', 'CLOSED')",
          ),
          checkExpression(
            "job_workplaceType_check_42d92d0c",
            "\"workplaceType\" IN ('ON_SITE', 'REMOTE', 'HYBRID')",
          ),
        ],
      }),
      this.createTable({
        schema: "public",
        table: "refreshToken",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("expiresAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("revokedAt", "timestamptz", { codecRef: { codecId: "pg/timestamptz-string@1" } }),
          col("tokenHash", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("userId", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
        ],
        constraints: [primaryKey(["id"])],
      }),
      this.createTable({
        schema: "public",
        table: "user",
        columns: [
          col("createdAt", "timestamptz", {
            notNull: true,
            default: fn("now()"),
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
          col("email", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("id", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("name", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("passwordHash", "text", { notNull: true, codecRef: { codecId: "pg/text@1" } }),
          col("role", "text", {
            notNull: true,
            default: lit("USER"),
            codecRef: { codecId: "pg/text@1" },
          }),
          col("updatedAt", "timestamptz", {
            notNull: true,
            codecRef: { codecId: "pg/timestamptz-string@1" },
          }),
        ],
        constraints: [
          primaryKey(["id"]),
          checkExpression("user_role_check_1954e8c0", "\"role\" IN ('USER', 'ADMIN')"),
        ],
      }),
      this.addUnique({
        schema: "public",
        table: "application",
        constraint: "application_userId_jobId_key",
        columns: ["userId", "jobId"],
      }),
      this.addUnique({
        schema: "public",
        table: "candidateProfile",
        constraint: "candidateProfile_userId_key",
        columns: ["userId"],
      }),
      this.addUnique({
        schema: "public",
        table: "refreshToken",
        constraint: "refreshToken_tokenHash_key",
        columns: ["tokenHash"],
      }),
      this.addUnique({
        schema: "public",
        table: "user",
        constraint: "user_email_key",
        columns: ["email"],
      }),
      this.createIndex({
        schema: "public",
        table: "application",
        index: "application_jobId_idx_623c8f77",
        columns: ["jobId"],
      }),
      this.createIndex({
        schema: "public",
        table: "application",
        index: "application_userId_idx_a489d58a",
        columns: ["userId"],
      }),
      this.createIndex({
        schema: "public",
        table: "job",
        index: "job_category_idx_f2600f8e",
        columns: ["category"],
      }),
      this.createIndex({
        schema: "public",
        table: "job",
        index: "job_experienceLevel_idx_88bcaa5e",
        columns: ["experienceLevel"],
      }),
      this.createIndex({
        schema: "public",
        table: "job",
        index: "job_isFeatured_status_createdAt_idx_7db32ec7",
        columns: ["isFeatured", "status", "createdAt"],
      }),
      this.createIndex({
        schema: "public",
        table: "job",
        index: "job_status_createdAt_idx_58610442",
        columns: ["status", "createdAt"],
      }),
      this.createIndex({
        schema: "public",
        table: "refreshToken",
        index: "refreshToken_userId_idx_a489d58a",
        columns: ["userId"],
      }),
      this.addForeignKey({
        schema: "public",
        table: "application",
        foreignKey: {
          name: "application_userId_fkey",
          columns: ["userId"],
          references: { schema: "public", table: "user", columns: ["id"] },
          onDelete: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "application",
        foreignKey: {
          name: "application_jobId_fkey",
          columns: ["jobId"],
          references: { schema: "public", table: "job", columns: ["id"] },
          onDelete: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "candidateProfile",
        foreignKey: {
          name: "candidateProfile_userId_fkey",
          columns: ["userId"],
          references: { schema: "public", table: "user", columns: ["id"] },
          onDelete: "cascade",
        },
      }),
      this.addForeignKey({
        schema: "public",
        table: "refreshToken",
        foreignKey: {
          name: "refreshToken_userId_fkey",
          columns: ["userId"],
          references: { schema: "public", table: "user", columns: ["id"] },
          onDelete: "cascade",
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
