import { DatabaseManager } from "../DatabaseManager";
import { HassetsuEvalDataType } from "./HassetsuEvalRepository.type";


export class HassetsuEvalRepository {

    /**
     * 1立ち分の射法八節評価を一括保存する（トランザクション）
     */
    static async createEvals(evals: HassetsuEvalDataType[]): Promise<void> {
        const db = await DatabaseManager.getDatabase();
        await db.withTransactionAsync(async () => {
            for (const e of evals) {
                await db.runAsync(
                    `INSERT INTO hassetsu_evals (round_id, phase_index, score, memo)
                     VALUES (?, ?, ?, ?)`,
                    [e.round_id, e.phase_index, e.score ?? null, e.memo ?? null]
                );
            }
        });
    }

    /**
     * 特定の立ちの射法八節評価を全段階取得する
     */
    static async getEvalsByRound(roundId: number): Promise<HassetsuEvalDataType[]> {
        const db = await DatabaseManager.getDatabase();
        return await db.getAllAsync(
            `SELECT * FROM hassetsu_evals WHERE round_id = ? ORDER BY phase_index ASC`,
            [roundId]
        );
    }

    /**
     * 特定の段階の評価を更新する
     */
    static async updateEval(id: number, score: number, memo: string): Promise<void> {
        const db = await DatabaseManager.getDatabase();
        await db.runAsync(
            `UPDATE hassetsu_evals SET score = ?, memo = ? WHERE id = ?`,
            [score, memo, id]
        );
    }
}
