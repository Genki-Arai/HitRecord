export type UserDataType = {
    id: string;
    name?: string;
    rank?: string; // 初段、二段など
    handedness?: number; // 0: 右利き, 1: 左利き
    created_at?: string;
    updated_at?: string;
    is_deleted?: number; // 0: 有効, 1: 論理削除済み
}