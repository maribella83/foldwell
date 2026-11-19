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
 * A note is the parent's own words, a "from" label like "Mom", and an
 * envelope color.
 */
import type { SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'foldwell.db';

/** The newest step. Bump this by one whenever a migration is added below. */
const LATEST_VERSION = 2;

export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  // Make the database enforce links between tables (a note must belong to a
  // real child). SQLite forgets this each time the app opens, so it is
  // switched on every time, before anything else. (It can't be changed from
  // inside a transaction, which is why it sits up here.)
  await db.execAsync('PRAGMA foreign_keys = ON;');

  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const currentVersion = row?.user_version ?? 0;

  if (currentVersion >= LATEST_VERSION) {
    return;
  }

  // Write-ahead logging: the safer, faster way for SQLite to save changes.
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

    if (currentVersion < 2) {
      // Notes a parent writes. "ON DELETE CASCADE" means: when a child is
      // removed, the database also removes that child's notes.
      await db.execAsync(`
        CREATE TABLE notes (
          id TEXT PRIMARY KEY NOT NULL,
          child_id TEXT NOT NULL REFERENCES children(id) ON DELETE CASCADE,
          from_label TEXT NOT NULL,
          envelope TEXT NOT NULL,
          body TEXT NOT NULL,
          created_at INTEGER NOT NULL
        );
        CREATE INDEX notes_child_id ON notes (child_id);
      `);
    }

    // Next step goes here, for example:
    // if (currentVersion < 3) { ... ALTER TABLE notes ADD COLUMN audio_file TEXT ... }

    await db.execAsync(`PRAGMA user_version = ${LATEST_VERSION};`);
  });
}
