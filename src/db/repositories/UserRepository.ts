import { DatabaseManager } from "../DatabaseManager";
import { UserDataType } from "./UserRepository.type";

export class UserRepository {

    static async createUser(userData: UserDataType): Promise<void> {
        const db = await DatabaseManager.getDatabase();
        await db.runAsync(
            `INSERT INTO users (id, name, rank, handedness) VALUES (?, ?, ?, ?)`,
            [userData.id, userData.name ?? null, userData.rank ?? null, userData.handedness ?? null]
        );
    }

    static async getUserById(userId: string): Promise<UserDataType | null> {
        const db = await DatabaseManager.getDatabase();
        return await db.getFirstAsync(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        );
    }

    static async updateUser(userId: string, userData: Partial<UserDataType>): Promise<void> {
        const db = await DatabaseManager.getDatabase();

        const currentUserData: UserDataType | null = await this.getUserById(userId);
        if (userData.name === undefined) {
            userData.name = currentUserData?.name;
        }
        if (userData.rank === undefined) {
            userData.rank = currentUserData?.rank;
        }
        if (userData.handedness === undefined) {
            userData.handedness = currentUserData?.handedness;
        }

        await db.runAsync(
            `UPDATE users SET name = ?, rank = ?, handedness = ? WHERE id = ?`,
            [userData.name ?? null, userData.rank ?? null, userData.handedness ?? null, userId]
        );
    }
}