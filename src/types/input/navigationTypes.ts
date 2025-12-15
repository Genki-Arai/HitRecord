import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { HitDataType2 } from "./HitDataType2";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  InputMain: undefined;
  HitResultBase: {
    date: string;
    hitDataList: HitDataType2[];
  };
  HitResultByDate: {
    date: string;
    hitDataList: HitDataType2[];
  };
  EditHitDataOfDate: {
    date: string;
    hitDataList: HitDataType2[];
  };
};

// export type EditHitDataOfDateNaviProps = StackScreenProps<
//   RootStackParamList,
//   "EditHitDataOfDate"
// >;

export type EditHitDataOfDateNaviProps = StackNavigationProp<
  RootStackParamList,
  "EditHitDataOfDate"
>;

export type EditHitDataOfDateRouteProps = RouteProp<
  RootStackParamList,
  "EditHitDataOfDate"
>;

export interface EditHitDataOfDateProps {
  route: EditHitDataOfDateRouteProps;
  navigation: EditHitDataOfDateNaviProps;
}
