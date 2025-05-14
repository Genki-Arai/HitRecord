import { View, ViewStyle } from "react-native";
import HitResult from "./HitResult";
import { useEffect, useState } from "react";
import { HitDataType, HitType, HitType2 } from "../commonTypes/types";

// export default (props: HitDataType) => {
export default (props: HitResultBaseProps2) => {
  const [firstHit, setFirstHit] = useState<HitType2>(props.first);
  const [secondHit, setSecondHit] = useState<HitType2>(props.second);
  const [thirdHit, setThirdHit] = useState<HitType2>(props.third);
  const [fourthHit, setFourthHit] = useState<HitType2>(props.fourth);

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
    padding: 15,
    marginHorizontal: 10,
  },
};

type HitResultBaseProps = {
    setDataList?: (dataList: any) => void;
    first?: HitType;
    second?: HitType;
    third?: HitType;
    fourth?: HitType;
}

type HitResultBaseProps2 = {
    setDataList?: (dataList: any) => void;
    first: HitType2;
    second: HitType2;
    third: HitType2;
    fourth: HitType2;
}