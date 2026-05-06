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
        try {
            await this.db.execAsync('PRAGMA foreign_keys = OFF;');
            
            const result = await this.db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
            let version = result?.user_version ?? 0;
            
            await this.db.withTransactionAsync(async () => {
                if (version < 1) {
                    await this.migrateV1();
                    version = 1;
                    await this.db.execAsync(`PRAGMA user_version = ${version}`);
                }
                // 将来のマイグレーションはここに追加
            })
            
            console.log(`データベースをバージョン${version}に初期化しました。`);
        } catch (error) {
            console.error("データベースのマイグレーション中にエラーが発生しました:", error);
            throw error; // エラーを呼び出し元に伝える
        } finally {
            await this.db.execAsync('PRAGMA foreign_keys = ON;');
        }
    }

    // v1: 初期スキーマ
    private static async migrateV1() {
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT,
                rank TEXT, -- 初段、二段など
                handedness INTEGER DEFAULT 0, -- 0: 右利き, 1: 左利き
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now')),
                is_deleted INTEGER DEFAULT 0 -- 0: 有効, 1: 論理削除済み
            );

            CREATE TABLE IF NOT EXISTS equipments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT REFERENCES users(id), -- Usersテーブルへの外部キー
                type TEXT NOT NULL, -- 'bow', 'arrow', 'string'
                brand_name TEXT, -- 銘・銘柄
                weight REAL, -- 弓の強さ (kg)。弓以外はNULL可
                shaft_material TEXT, -- 矢の素材 (カーボン・ジュラ等)。矢以外はNULL可
                length_cm REAL, -- 矢の長さ (cm)。矢以外はNULL可
                is_active INTEGER DEFAULT 1, -- 1: 使用中, 0: 非アクティブ
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now')),
                is_deleted INTEGER DEFAULT 0 -- 0: 有効, 1: 論理削除済み
            );

            CREATE TABLE IF NOT EXISTS sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT REFERENCES users(id), -- Usersテーブルへの外部キー
                category TEXT NOT NULL, -- 'practice', 'match', 'test', 'other'
                date TEXT NOT NULL, -- 実施日 (YYYY-MM-DD)
                location TEXT, -- 道場・会場名
                weather TEXT, -- 天候・気温・風速等の環境情報
                wind_level INTEGER, -- 風の強さ: 0〜5
                memo TEXT, -- 全体の感想、体調など
                target_distance TEXT NOT NULL DEFAULT 'close', -- 'close':近的, 'far':遠的
                target_type TEXT NOT NULL DEFAULT 'kasumi', -- 'kasumi':霞的, 拡張 → 'hoshi':星的, 'tokuten':得点的
                created_at TEXT DEFAULT (datetime('now')), -- レコード作成日時 (UTC)
                updated_at TEXT DEFAULT (datetime('now')), -- 最終更新日時 (UTC)
                is_deleted INTEGER DEFAULT 0, -- 0: 有効, 1: 論理削除済み
                equipment_bow_id INTEGER REFERENCES equipments(id), -- 使用した弓のID。NULL可
                equipment_arrow_id INTEGER REFERENCES equipments(id), -- 使用した矢のID。NULL可
                equipment_string_id INTEGER REFERENCES equipments(id) -- 使用した弦のID。NULL可
            );

            CREATE TABLE IF NOT EXISTS rounds (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id INTEGER NOT NULL, -- sessionsテーブルへの外部キー
                position_index INTEGER, -- 立ち位置 (0:大前, 1:二的, 2:中, 3:四的, 4:落)
                total_arrows INTEGER NOT NULL DEFAULT 4, -- 1立ちの矢数 (デフォルト4)
                is_kaichu INTEGER DEFAULT 0, -- 皆中フラグ (0/1)。全矢的中時に自動更新
                created_at TEXT DEFAULT (datetime('now')), -- レコード作成日時 (UTC)
                updated_at TEXT DEFAULT (datetime('now')), -- 最終更新日時 (UTC)
                is_deleted INTEGER DEFAULT 0, -- 0: 有効, 1: 論理削除済み
                FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS shots (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                round_id INTEGER NOT NULL, -- roundsテーブルへの外部キー
                arrow_index INTEGER NOT NULL, -- 矢の順序 (1, 2, 3, ...)
                result INTEGER CHECK(result IN (0, 1)), -- 1: 的中, 0: 外れ
                x_coord REAL, -- X座標 (正規化された値: -0.5〜0.5、的の中心が(0,0))
                y_coord REAL, -- Y座標 (正規化された値: -0.5〜0.5、的の中心が(0,0))
                created_at TEXT DEFAULT (datetime('now')), -- レコード作成日時 (UTC)
                updated_at TEXT DEFAULT (datetime('now')), -- 最終更新日時 (UTC)
                is_deleted INTEGER DEFAULT 0, -- 0: 有効, 1: 論理削除済み
                FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS hassetsu_evals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                round_id INTEGER NOT NULL, -- roundsテーブルへの外部キー
                phase_index INTEGER NOT NULL CHECK(phase_index BETWEEN 0 AND 7), -- 射法八節の段階番号 (0:足踏み〜7:残身)
                score INTEGER CHECK(score BETWEEN 1 AND 5), -- 自己評価スコア (1〜5)
                memo TEXT, -- 定性メモ (NULL可)
                created_at TEXT DEFAULT (datetime('now')), -- レコード作成日時 (UTC)
                updated_at TEXT DEFAULT (datetime('now')), -- 最終更新日時 (UTC)
                is_deleted INTEGER DEFAULT 0, -- 0: 有効, 1: 論理削除済み
                FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
            );

            -- インデックスの作成
            CREATE INDEX IF NOT EXISTS idx_shots_round_id ON shots(round_id);
            CREATE INDEX IF NOT EXISTS idx_rounds_session_id ON rounds(session_id);
            CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date);
            CREATE INDEX IF NOT EXISTS idx_sessions_user_id_date ON sessions(user_id, date);
            CREATE INDEX IF NOT EXISTS idx_equipments_user_id ON equipments(user_id);
            CREATE INDEX IF NOT EXISTS idx_hassetsu_evals_round_id ON hassetsu_evals(round_id);
        `);
    }

}