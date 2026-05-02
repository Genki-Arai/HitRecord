import { DatabaseManager } from "../DatabaseManager";
import { ShotDataType } from "./ShotRepository.type";


export class ShotRepository {
    /**
     * 矢1本の的中結果をローカルDBに保存する
     */
    static async createShot(shotData: ShotDataType): Promise<number> {
        const db = await DatabaseManager.getDatabase();

        const result = await db.runAsync(
            `INSERT INTO shots (
                round_id,
                arrow_id,
                arrow_index,
                result,
                x_coord,
                y_coord,
                updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))`,
            [shotData.round_id, shotData.arrow_id ?? null, shotData.arrow_index ?? null, shotData.result, shotData.x_coord, shotData.y_coord]
        );

        return result.lastInsertRowId;
    }

    /**
     * 特定の立ち（Round）の的中結果をすべて取得する
     */
    static async getShotsByRound(roundId: number): Promise<ShotDataType[]> {
        const db = await DatabaseManager.getDatabase();
        return await db.getAllAsync(
            `SELECT * FROM shots WHERE round_id = ? AND is_deleted = 0 ORDER BY id ASC`,
            [roundId]
        );
    }
}