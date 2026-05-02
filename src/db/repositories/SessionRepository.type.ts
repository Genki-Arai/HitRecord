
export type SessionDataType = {
    id: number;
    user_id?: string;
    category: string;
    date: string;
    location?: string;
    weather?: string;
    note?: string;
    created_at?: string;
    updated_at?: string;
    is_synced?: number;
    is_deleted?: number;
}