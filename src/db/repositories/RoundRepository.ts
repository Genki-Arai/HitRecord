import { DatabaseManager } from "../DatabaseManager";
import { RoundDataType } from "./RoundRepository.type";

export class RoundRepository {
  static async createRound(
    session_id: number,
    total_arrows: number,
    position_index?: number,
  ): Promise<number> {
    const db = await DatabaseManager.getDatabase();

    const result = await db.runAsync(
      `INSERT INTO rounds (session_id, position_index, total_arrows) VALUES (?, ?, ?)`,
      [session_id, position_index ?? null, total_arrows],
    );
    return result.lastInsertRowId;
  }

  static async getRoundsBySessionId(
    sessionId: number,
  ): Promise<RoundDataType[]> {
    const db = await DatabaseManager.getDatabase();
    return await db.getAllAsync(
      `SELECT * FROM rounds WHERE session_id = ? AND is_deleted = 0`,
      [sessionId],
    );
  }

  static async getRoundById(roundId: number): Promise<RoundDataType | null> {
    const db = await DatabaseManager.getDatabase();
    return await db.getFirstAsync(
      `SELECT * FROM rounds WHERE id = ? AND is_deleted = 0`,
      [roundId],
    );
  }

  static async updateKaichu(roundId: number, isKaichu: number): Promise<void> {
    const db = await DatabaseManager.getDatabase();
    await db.runAsync(`UPDATE rounds SET is_kaichu = ?, updated_at = datetime('now') WHERE id = ?`, [
      isKaichu,
      roundId,
    ]);
  }

  static async deleteRound(roundId: number): Promise<void> {
    // 物理削除ではなく論理削除を行う
    const db = await DatabaseManager.getDatabase();
    await db.runAsync(`UPDATE rounds SET is_deleted = 1, updated_at = datetime('now') WHERE id = ?`, [
      roundId,
    ]);
  }
}
