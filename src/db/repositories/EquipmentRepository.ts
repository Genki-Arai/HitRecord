import { DatabaseManager } from "../DatabaseManager";
import { EquipmentDataType } from "./EquipmentRepository.type";


export class EquipmentRepository {
    static async createEquipment(equipmentData: EquipmentDataType): Promise<number> {
        const db = await DatabaseManager.getDatabase();
        const result = await db.runAsync(
            `INSERT INTO equipments (user_id, type, brand_name, weight, shaft_material, length_cm, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                equipmentData.user_id,
                equipmentData.type,
                equipmentData.brand_name ?? null,
                equipmentData.weight ?? null,
                equipmentData.shaft_material ?? null,
                equipmentData.length_cm ?? null,
                equipmentData.is_active ?? 1, // デフォルトは使用中
            ]
        );

        return result.lastInsertRowId;
    }

    static async getActiveEquipments(user_id: string, type: 'bow' | 'arrow' | 'string'): Promise<EquipmentDataType[]> {
        const db = await DatabaseManager.getDatabase();
        return await db.getAllAsync(
            `SELECT * FROM equipments WHERE user_id = ? AND type = ? AND is_active = 1`,
            [user_id, type]
        );
    }

    static async deactivateEquipment(id: number): Promise<void> {
        const db = await DatabaseManager.getDatabase();
        await db.runAsync(
            `UPDATE equipments SET is_active = 0 WHERE id = ?`,
            [id]
        );
    }
    
}