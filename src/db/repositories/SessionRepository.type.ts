
export type SessionDataType = {
    id: number;
    user_id?: string;
    category: categoryType;
    date: string;
    location?: string;
    weather?: string;
    wind_level?: number;
    memo?: string | null;
    target_distance: target_distanceType;
    target_type: target_typeType;
    created_at?: string;
    updated_at?: string;
    is_deleted?: number;
    equipment_bow_id?: number | null;
    equipment_arrow_id?: number | null;
    equipment_string_id?: number | null;
}

export type UpdateSessionDataType = Partial<Omit<SessionDataType, 
    'category' | 
    'target_distance' | 
    'target_type' |
    'id' |
    'created_at' |
    'updated_at' |
    'is_deleted'
    >>;

export type categoryType = 'practice' | 'match' | 'test' | 'other';
export type target_distanceType = 'close' | 'far';
export type target_typeType = 'kasumi'; // 拡張 → 'hoshi':星的, 'tokuten':得点的