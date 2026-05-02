import { DatabaseManager } from "../DatabaseManager";
import { SessionDataType } from "./SessionRepository.type";


export class SessionRepository {
    
    static async createSessionWithAllFields(category: string, date: string, location: string, weather: string, note: string): Promise<number> {
        const db = await DatabaseManager.getDatabase();
        const result = await db.runAsync(
            `INSERT INTO sessions (category, date, location, weather, note) VALUES (?, ?, ?, ?, ?)`,
            [category, date, location, weather, note]
        );
        return result.lastInsertRowId;
    }

    static async createSessionWithoutOptionalFields(category: string, date: string): Promise<number> {
        const db = await DatabaseManager.getDatabase();
        const result = await db.runAsync(
            `INSERT INTO sessions (category, date) VALUES (?, ?)`,
            [category, date]
        );
        return result.lastInsertRowId;
    }
    
    static async getSessionById(sessionId: number): Promise<SessionDataType[] | null> {
        const db = await DatabaseManager.getDatabase();
        return await db.getAllAsync(
            `SELECT * FROM sessions WHERE id = ? AND is_deleted = 0`, 
            [sessionId]
        );
    }
}