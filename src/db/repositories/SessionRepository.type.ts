
export type SessionDataType = {
    id: number;
    user_id?: string;
    category: string;
    date: string;
    location?: string;
    weather?: string;
    wind_level?: number;
    memo?: string;
    target_distance: string;
    target_type: string;
    created_at?: string;
    updated_at?: string;
    is_deleted?: number;
}