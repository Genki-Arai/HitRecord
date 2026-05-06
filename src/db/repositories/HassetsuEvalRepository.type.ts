
// 射法八節の段階番号と名称の対応
export const HASSETSU_PHASES = [
    { index: 0, ja: '足踏み', en: 'ashibumi' },
    { index: 1, ja: '胴造り', en: 'dozukuri' },
    { index: 2, ja: '弓構え', en: 'yugamae' },
    { index: 3, ja: '打起し', en: 'uchiokoshi' },
    { index: 4, ja: '引分け', en: 'hikiwake' },
    { index: 5, ja: '会',     en: 'kai' },
    { index: 6, ja: '離れ',   en: 'hanare' },
    { index: 7, ja: '残身',   en: 'zanshin' },
] as const;

export type HassetsuEvalDataType = {
    id?: number;
    round_id: number;
    phase_index: number; // 0〜7
    score?: number;      // 1〜5
    memo?: string;
    created_at?: string;
    updated_at?: string;
    is_deleted?: number; // 0: 有効, 1: 論理削除済み
}
