import { DatabaseManager } from "../DatabaseManager";
import { SessionDataType } from "./SessionRepository.type";


export class SessionRepository {
    
    static async createSession(category: string, date: string, location?: string, weather?: string, note?: string): Promise<number> {
        const db = await DatabaseManager.getDatabase();
        const result = await db.runAsync(
            `INSERT INTO sessions (category, date, location, weather, note) VALUES (?, ?, ?, ?, ?)`,
            [category, date, location ?? null, weather ?? null, note ?? null]
        );
        return result.lastInsertRowId;
    }
    
    static async getSessionById(sessionId: number): Promise<SessionDataType | null> {
        const db = await DatabaseManager.getDatabase();
        return await db.getFirstAsync(
            `SELECT * FROM sessions WHERE id = ? AND is_deleted = 0`, 
            [sessionId]
        );
    }

    static async deleteSession(id: number): Promise<void> {
        const db = await DatabaseManager.getDatabase();
        await db.runAsync(
            `UPDATE sessions SET is_deleted = 1 WHERE id = ?`,
            [id]
        );
    }
}