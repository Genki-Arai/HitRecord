import { DatabaseManager } from "../DatabaseManager";
import { ShotDataType } from "./ShotRepository.type";


export class ShotRepository {
    /**
     * 矢1本の的中結果をローカルDBに保存する
     */
    static async createShot(shotData: Omit<ShotDataType, "id">): Promise<number> {
        const db = await DatabaseManager.getDatabase();

        const result = await db.runAsync(
            `INSERT INTO shots (
                round_id,
                arrow_index,
                result,
                x_coord,
                y_coord
            ) VALUES (?, ?, ?, ?, ?)`,
            [shotData.round_id, shotData.arrow_index, shotData.result, shotData.x_coord, shotData.y_coord]
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

    static async updateShot(id: number, result: number, x_coord: number, y_coord: number): Promise<void> {
        const db = await DatabaseManager.getDatabase();
        await db.runAsync(
            `UPDATE shots SET result = ?, x_coord = ?, y_coord = ?, updated_at = datetime('now') WHERE id = ?`,
            [result, x_coord, y_coord, id]
        );
    }
}