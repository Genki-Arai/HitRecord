import { DatabaseManager } from "../DatabaseManager";
import { SessionDataType, UpdateSessionDataType } from "./SessionRepository.type";

export class SessionRepository {
  static async createSession(
    sessionData: Omit<SessionDataType, "id">,
  ): Promise<number> {
    const db = await DatabaseManager.getDatabase();
    const result = await db.runAsync(
      `INSERT INTO sessions (
        user_id, 
        category, 
        date, 
        location, 
        weather, 
        wind_level, 
        memo, 
        target_distance, 
        target_type, 
        equipment_bow_id, 
        equipment_arrow_id, 
        equipment_string_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sessionData.user_id ?? null,
        sessionData.category,
        sessionData.date,
        sessionData.location ?? null,
        sessionData.weather ?? null,
        sessionData.wind_level ?? null,
        sessionData.memo ?? null,
        sessionData.target_distance,
        sessionData.target_type,
        sessionData.equipment_bow_id ?? null,
        sessionData.equipment_arrow_id ?? null,
        sessionData.equipment_string_id ?? null,
      ],
    );
    return result.lastInsertRowId;
  }

  static async getSessionById(
    sessionId: number,
  ): Promise<SessionDataType | null> {
    const db = await DatabaseManager.getDatabase();
    return await db.getFirstAsync(
      `SELECT * FROM sessions WHERE id = ? AND is_deleted = 0`,
      [sessionId],
    );
  }

  static async deleteSession(id: number): Promise<void> {
    const db = await DatabaseManager.getDatabase();
    await db.runAsync(
      `UPDATE sessions SET is_deleted = 1, updated_at = datetime('now') WHERE id = ?`,
      [id],
    );
  }

  static async updateSession(sessionId: number,updateData: UpdateSessionDataType): Promise<void> {
    const db = await DatabaseManager.getDatabase();

    const currentSessionData: SessionDataType | null = await this.getSessionById(sessionId);
    if (!currentSessionData) {
      throw new Error(`セッションが見つかりません。セッションID: ${sessionId}`);
    }

    await db.runAsync(
        `UPDATE sessions SET
            date = ?,
            memo = ?,
            equipment_bow_id = ?,
            equipment_arrow_id = ?,
            equipment_string_id = ?,
            updated_at = datetime('now')
        WHERE id = ?`,
        [
            updateData.date !== undefined ? updateData.date : currentSessionData.date,
            updateData.memo !== undefined ? updateData.memo : currentSessionData.memo ?? null,
            updateData.equipment_bow_id !== undefined ? updateData.equipment_bow_id : currentSessionData.equipment_bow_id ?? null,
            updateData.equipment_arrow_id !== undefined ? updateData.equipment_arrow_id : currentSessionData.equipment_arrow_id ?? null,
            updateData.equipment_string_id !== undefined ? updateData.equipment_string_id : currentSessionData.equipment_string_id ?? null,
            sessionId,
        ]
    );
  }
}
