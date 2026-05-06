export type EquipmentDataType = {
    id?: number;
    user_id: string;
    type: 'bow' | 'arrow' | 'string';
    brand_name?: string;
    weight?: number; // 弓の強さ (kg)。弓以外はNULL可
    shaft_material?: string; // 矢の素材（例: カーボン、アルミなど）。弓や弦はNULL可
    length_cm?: number; // 矢の長さ（cm）。弓や弦はNULL可
    is_active?: number; // 1: 使用中, 0: 非アクティブ
    created_at?: string;
    updated_at?: string;
    is_deleted?: number; // 0: 有効, 1: 論理削除済み
}
