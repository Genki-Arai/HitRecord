

/**
 * 
 * @param position 立ち位置のID（number）
 * @returns 対応する立ち位置を返す
 */
export const getPosition: (position: number) => string = (position) => {
  switch (position) {
    case 1: return "大前";
    case 2: return "二的";
    case 3: return "中";
    case 4: return "落前";
    case 5: return "落";
    default: return "不明";
    }
};