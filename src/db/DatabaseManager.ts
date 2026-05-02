import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";


export class DatabaseManager {
    private static db: SQLiteDatabase;

    static async getDatabase(): Promise<SQLiteDatabase> {
        if (!this.db) {
            this.db = await openDatabaseAsync("hitrecord.db");
            await this.setupPragma();
            await this.migrate();
        }
        return this.db;
    }

    private static async setupPragma() {
        await this.db.execAsync(`
            PRAGMA foreign_keys = ON;
            PRAGMA journal_mode = WAL;
        `);
    }

    private static async migrate() {
        const result = await this.db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
        let version = result?.user_version ?? 0;

        if (version < 1) {
            await this.migrateV1();
            version = 1;
        }

        if (version < 2) {
            await this.migrateV2();
            version = 2;
        }

        await this.db.execAsync(`PRAGMA user_version = ${version}`);
        console.log(`データベースをバージョン${version}に初期化しました。`);
    }

    // v1: 初期スキーマ
    private static async migrateV1() {
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT,
                rank TEXT, -- 初段、二段など
                handedness INTEGER DEFAULT 0 -- 0: 右利き, 1: 左利き
            );

            CREATE TABLE IF NOT EXISTS equipments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL, -- 'bow', 'arrow', 'string'
                brand_name TEXT, -- 銘・銘柄
                weight REAL, -- 弓の強さ (kg)。弓以外はNULL可
                is_active INTEGER DEFAULT 1 -- 1: 使用中, 0: 非アクティブ
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT NOT NULL, -- 'practice', 'match', 'test', 'other'
                date TEXT NOT NULL, -- 実施日 (YYYY-MM-DD)
                location TEXT, -- 道場・会場名
                weather TEXT, -- 天候・気温・風速等の環境情報
                note TEXT, -- 全体の感想、体調など
                created_at TEXT DEFAULT (datetime('now')), -- レコード作成日時 (UTC)
                updated_at TEXT DEFAULT (datetime('now')), -- 最終更新日時 (UTC)
                is_synced INTEGER DEFAULT 0 -- 0: 未同期, 1: 同期済み
            );

            CREATE TABLE IF NOT EXISTS rounds (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER NOT NULL, -- sessionsテーブルへの外部キー
                bow_id INTEGER, -- 使用した弓のID (equipments)
                position_index INTEGER, -- 立ち位置 (0:大前, 1:二的, 2:中, 3:四的, 4:落)
                hassetsu_evaluation TEXT, -- 射法八節の評価 (JSON形式・移行期のみ使用)
                FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
                FOREIGN KEY (bow_id) REFERENCES equipments(id)
            );

            CREATE TABLE IF NOT EXISTS shots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                round_id INTEGER NOT NULL, -- roundsテーブルへの外部キー
                arrow_index INTEGER NOT NULL, -- 矢の順序 (1, 2, 3, ...)
                result INTEGER CHECK(result IN (0, 1)), -- 1: 的中, 0: 失
                x_coordinate REAL, -- X座標 (mm: 的中心を0とする)
                y_coordinate REAL, -- Y座標 (mm: 的中心を0とする)
                is_synced INTEGER DEFAULT 0, -- 0: 未同期, 1: 同期済み
                created_at TEXT DEFAULT (datetime('now')), -- レコード作成日時 (UTC)
                updated_at TEXT DEFAULT (datetime('now')), -- 最終更新日時 (UTC)
                is_deleted INTEGER DEFAULT 0, -- 0: 有効, 1: 論理削除済み
                FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_shots_round_id ON shots(round_id);
            CREATE INDEX IF NOT EXISTS idx_rounds_session_id ON rounds(session_id);
            CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date);
        `);
    }

    // v2: 仕様書Ver5に対応したスキーマ拡張
    private static async migrateV2() {
        // sessions: user_id・is_deleted 追加
        await this.db.execAsync(`
            ALTER TABLE sessions ADD COLUMN user_id TEXT REFERENCES users(id); -- Usersテーブルへの外部キー
            ALTER TABLE sessions ADD COLUMN is_deleted INTEGER DEFAULT 0; -- 0: 有効, 1: 論理削除済み
        `);

        // equipments: user_id・矢専用カラム追加
        await this.db.execAsync(`
            ALTER TABLE equipments ADD COLUMN user_id TEXT REFERENCES users(id); -- Usersテーブルへの外部キー
            ALTER TABLE equipments ADD COLUMN shaft_material TEXT; -- 矢の素材 (カーボン・ジュラ等)。矢以外はNULL可
            ALTER TABLE equipments ADD COLUMN length_cm REAL; -- 矢の長さ (cm)。矢以外はNULL可
        `);

        // rounds: 可変矢数・皆中フラグ・is_deleted追加、JSON評価列を削除
        await this.db.execAsync(`
            ALTER TABLE rounds ADD COLUMN total_arrows INTEGER NOT NULL DEFAULT 4; -- 1立ちの矢数 (デフォルト4)
            ALTER TABLE rounds ADD COLUMN is_kaichu INTEGER DEFAULT 0; -- 皆中フラグ (0/1)。全矢的中時に自動更新
            ALTER TABLE rounds ADD COLUMN is_deleted INTEGER DEFAULT 0; -- 0: 有効, 1: 論理削除済み
            ALTER TABLE rounds DROP COLUMN hassetsu_evaluation; -- 正規化版hassetsu_evalsへ移行のため削除
        `);

        // shots: カラム名をx_coord/y_coordに統一、arrow_id追加
        await this.db.execAsync(`
            ALTER TABLE shots RENAME COLUMN x_coordinate TO x_coord; -- X座標 (mm: 的中心を0とする)
            ALTER TABLE shots RENAME COLUMN y_coordinate TO y_coord; -- Y座標 (mm: 的中心を0とする)
            ALTER TABLE shots ADD COLUMN arrow_id INTEGER REFERENCES equipments(id); -- 使用した矢のID。NULL可
        `);

        // hassetsu_evals: 射法八節評価（正規化版）
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS hassetsu_evals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                round_id INTEGER NOT NULL, -- roundsテーブルへの外部キー
                phase_index INTEGER NOT NULL CHECK(phase_index BETWEEN 0 AND 7), -- 射法八節の段階番号 (0:足踏み〜7:残身)
                score INTEGER CHECK(score BETWEEN 1 AND 5), -- 自己評価スコア (1〜5)
                memo TEXT, -- 定性メモ (NULL可)
                FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
            );
        `);

        // 追加インデックス
        await this.db.execAsync(`
            CREATE INDEX IF NOT EXISTS idx_sessions_user_id_date ON sessions(user_id, date);
            CREATE INDEX IF NOT EXISTS idx_equipments_user_id ON equipments(user_id);
            CREATE INDEX IF NOT EXISTS idx_hassetsu_evals_round_id ON hassetsu_evals(round_id);
        `);
    }
}