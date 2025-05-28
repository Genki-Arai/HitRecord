import { View } from "react-native";
import HitResult from "./HitResult";
import { useEffect, useState } from "react";
import { HitType } from "../../types/input/HitDataType";
import { HitType2 } from "../../types/input/hitType2";
import { HitResultBaseStyles } from "./styles_input/StylesOfInput";

export default (props: HitResultBaseProps2) => {
  const [firstHit, setFirstHit] = useState<HitType2>(props.first);
  const [secondHit, setSecondHit] = useState<HitType2>(props.second);
  const [thirdHit, setThirdHit] = useState<HitType2>(props.third);
  const [fourthHit, setFourthHit] = useState<HitType2>(props.fourth);

  useEffect(() => {}, [firstHit, secondHit, thirdHit, fourthHit]);
 
  return (
    <View style={HitResultBaseStyles.hitResultBaseContainer}>
      <HitResult isHit={firstHit} setHit={setFirstHit} />
      <HitResult isHit={secondHit} setHit={setSecondHit} />
      <HitResult isHit={thirdHit} setHit={setThirdHit} />
      <HitResult isHit={fourthHit} setHit={setFourthHit} />
    </View>
  );
};



type HitResultBaseProps = {
  setDataList?: (dataList: any) => void;
  first?: HitType;
  second?: HitType;
  third?: HitType;
  fourth?: HitType;
};

type HitResultBaseProps2 = {
  setDataList?: (dataList: any) => void;
  first: HitType2;
  second: HitType2;
  third: HitType2;
  fourth: HitType2;
};
