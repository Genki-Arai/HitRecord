import { DatabaseManager } from "../DatabaseManager";
import { SessionDataType } from "./SessionRepository.type";

export class SessionRepository {
  static async createSession(
    sessionData: Omit<SessionDataType, "id">,
  ): Promise<number> {
    const db = await DatabaseManager.getDatabase();
    const result = await db.runAsync(
      `INSERT INTO sessions (user_id, category, date, location, weather, wind_level, memo, target_distance, target_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
}
