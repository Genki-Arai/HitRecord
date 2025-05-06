import { View, ViewStyle } from "react-native";
import HitResult from "./HitResult";
import { useEffect, useState } from "react";
import { HitDataType, HitType } from "../commonTypes/types";

// export default (props: HitDataType) => {
export default (props: HitResultBaseProps) => {
  const [firstHit, setFirstHit] = useState<HitType>(props.first ? props.first : null);
  const [secondHit, setSecondHit] = useState<HitType>(null);
  const [thirdHit, setThirdHit] = useState<HitType>(null);
  const [fourthHit, setFourthHit] = useState<HitType>(null);

  useEffect(() => {
    
  }, [firstHit, secondHit, thirdHit, fourthHit])

  return (
    <View style={styles.hitResultBaseContainer}>
      <HitResult isHit={firstHit} setHit={setFirstHit} />
      <HitResult isHit={secondHit} setHit={setSecondHit} />
      <HitResult isHit={thirdHit} setHit={setThirdHit} />
      <HitResult isHit={fourthHit} setHit={setFourthHit} />
    </View>
  );
};

const styles: { hitResultBaseContainer: ViewStyle } = {
  hitResultBaseContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
  },
};

type HitResultBaseProps = {
    setDataList?: (dataList: any) => void;
    first?: HitType;
    second?: HitType;
    third?: HitType;
    fourth?: HitType;
}
