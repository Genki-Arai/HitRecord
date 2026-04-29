import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";


export class DatabaseManager {
    private static db: SQLiteDatabase;

    static async getDatabase(): Promise<SQLiteDatabase> {
        if(!this.db) {
            this.db = await openDatabaseAsync("hitrecord.db");
            await this.setupPragma();
            await this.createTables();
        }
        return this.db;
    }

    private static async setupPragma() {
        await this.db.execAsync(`
            PRAGMA foreign_keys = ON;
            PRAGMA journal_mode = WAL;`)
    }

    private static async createTables() {
        const result: { user_version: number } | null = await this.db.getFirstAsync<{ user_version: number}>("PRAGMA user_version");
        let userVersion: number = result?.user_version ?? 0;

        if (userVersion < 1) { // version 1 DB初期化
            // 1. usersテーブル: ユーザープロフィール情報を保存
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS users (
                    id Text PRIMARY KEY,
                    name TEXT,
                    rank TEXT, -- 初段、二段など
                    handedness INTEGER DEFAULT 0 -- 0: 右利き, 1: 左利き
                );
            `);

            // 2. equipmentsテーブル: 弓や矢などの用具情報を保存
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS equipments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT NOT NULL, -- 'bow'や'arrow'など
                    brand_name TEXT, -- 弓や矢の名前
                    weight REAL, -- 重さ（弓ならば引き尺、矢ならば重さなど）
                    is_active INTEGER DEFAULT 1 -- 0: 非アクティブ, 1: アクティブ
                );
            `);

            // 3. sessionsテーブル: 練習セッションの基本情報を保存
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    category TEXT NOT NULL, -- 的中記録のカテゴリ（例：練習=practice、試合=match、審査=test、その他=otherなど）
                    date TEXT NOT NULL, -- セッションの日付
                    location TEXT, -- 道場名や練習場所
                    weather TEXT, -- 天候（晴れ、雨、曇りなど）
                    note TEXT, -- 感想や体調などのメモ
                    created_at TEXT DEFAULT (datetime('now')), -- データ作成日時
                    updated_at TEXT DEFAULT (datetime('now')), -- データ更新日時
                    is_synced INTEGER DEFAULT 0 -- 0: 未同期, 1: 同期済み
                );
            `);

            // 4. roundsテーブル: 各セッション内のラウンド情報（立ちの情報）を保存
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS rounds (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id INTEGER NOT NULL, -- sessionsテーブルへの外部キー
                    bow_id INTEGER, -- 使用した弓のID（equipmentsテーブルへの外部キー）
                    position_index INTEGER, -- 立ちの位置（例：大前=1、二的=2、中=3、落前=4、落=5）
                    hassetsu_evaluation TEXT, -- 射法八節の評価（JSON形式で保存予定）
                    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE, -- セッションが削除されたら関連するラウンドも削除
                    FOREIGN KEY (bow_id) REFERENCES equipments(id)
                );
            `);

            // 5. shotsテーブル: 1射ごとの詳細情報を保存
            await this.db.execAsync(`
                CREATE TABLE IF NOT EXISTS shots (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    round_id INTEGER NOT NULL, -- roundsテーブルへの外部キー
                    arrow_index INTEGER NOT NULL, -- 射数（1射目、2射目など）
                    result INTEGER, -- 的中結果（例：0=外れ, 1=的中）
                    x_coordinate REAL, -- 的中位置のX座標
                    y_coordinate REAL, -- 的中位置のY座標
                    is_synced INTEGER DEFAULT 0, -- 0: 未同期, 1: 同期済み
                    created_at TEXT DEFAULT (datetime('now')), -- データ作成日時
                    updated_at TEXT DEFAULT (datetime('now')), -- データ更新日時
                    is_deleted INTEGER DEFAULT 0, -- 0: 有効, 1: 削除済み
                    FOREIGN KEY (round_id) REFERENCES rounds(id) ON DELETE CASCADE
                );
            `);

            // インデックスの作成: クエリのパフォーマンス向上のために必要なカラムにインデックスを追加
            await this.db.execAsync(`
                CREATE INDEX IF NOT EXISTS idx_shots_round_id ON shots(round_id);
                CREATE INDEX IF NOT EXISTS idx_rounds_session_id ON rounds(session_id);
                CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date);
            `);

            userVersion = 1;

        }

        await this.db.execAsync(`PRAGMA user_version = ${userVersion}`);
        console.log(`データベースをバージョン${userVersion}に初期化しました。`);
    }
}