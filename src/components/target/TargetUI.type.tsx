export type TargetUIMode = 'input' | 'review';

export type ShotPropType = {
    x_normalized: number; // -0.5〜0.5の範囲で正規化されたX座標
    y_normalized: number; // -0.5〜0.5の範囲で正規化されたY座標
    is_hit: boolean; // 的中かどうか
    arrow_index: number; // 矢の順番（1本目、2本目など）
}

export type TargetUIProps = {
    mode: TargetUIMode;
    shots: ShotPropType[]; // 立ち内のすべての矢の情報
    activeIndex?: number; // 入力モードで、現在入力中の矢のインデックス
    size: number; // 的のサイズ(SCREEN_WIDTH * 0.75)
    onShotTap?: (arrow_index: number) => void; // 入力モードで、矢がタップされたときのコールバック
    onShotDragEnd?: (arrow_index: number, x_normalized: number, y_normalized: number) => void; // 入力モードで、矢のドラッグが終了したときのコールバック
}

export type LayoutInfoType = {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type ArrowPositionType = {
  x: number;
  y: number;
  index: number;
}

export type JudgeResultType = {
    is_inside: boolean;
    x_normalized: number; // X座標
    y_normalized: number; // Y座標
    is_hit: boolean; // 的中かどうか
}

export type TargetUIHandleType = {
    judge: (pageX: number, pageY: number) => JudgeResultType | null;
}