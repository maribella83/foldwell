/**
 * The on-device database: one small file on the phone, never sent anywhere.
 *
 * It is made of numbered "migrations": steps that build or change the
 * layout of the tables. The database remembers which step it is on (a
 * number called user_version), so each step runs only once. That lets a
 * future app update add a table or a column without erasing what families
 * already saved.
 *
 * THE ONE RULE: once an app version has shipped, never edit a step that
 * already exists. Add a new step at the end instead.
 *
 * Per the privacy rules, a child is only ever a nickname + age band.
 */
import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'foldwell.db';

/** The newest step. Bump this by one whenever a migration is added below. */
const LATEST_VERSION = 1;

export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= LATEST_VERSION) {
    return;
  }

  // Write-ahead logging: the safer, faster way for SQLite to save changes.
  // (It can't be switched on from inside a transaction, so it goes first.)
  await db.execAsync("PRAGMA journal_mode = 'wal';");

  // All the steps run as one unit: either every step finishes and the
  // version number moves up, or nothing changes. That way a crash halfway
  // can't leave a half-built database that fails to start next time.
  await db.withTransactionAsync(async () => {
    if (currentVersion < 1) {
      await db.execAsync(`
        CREATE TABLE children (
          id TEXT PRIMARY KEY NOT NULL,
          nickname TEXT NOT NULL,
          age_band TEXT NOT NULL,
          created_at INTEGER NOT NULL
        );
      `);
    }

    // Next step goes here, for example:
    // if (currentVersion < 2) { ... CREATE TABLE notes (...) ... }

    await db.execAsync(`PRAGMA user_version = ${LATEST_VERSION};`);
  });
}
