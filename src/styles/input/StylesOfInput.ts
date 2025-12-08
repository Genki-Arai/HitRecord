import { TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";

type ShowDateHitDataStyle = {
  container: ViewStyle;
  text: TextStyle;
  touchableOpacity?: TouchableOpacityProps;
  dateView?: ViewStyle;
  dataView?: ViewStyle;
  datasView?: ViewStyle;
};

export const hitResultByDateStyles: ShowDateHitDataStyle = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: HitRecordColors.gray,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: HitRecordColors.background,
  },
  text: {
    fontSize: 16,
    color: HitRecordColors.primary,
  },
  dateView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: HitRecordColors.background,
  },
  dataView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: HitRecordColors.background,
  },
};

type HitResultByMonthStyle = {
  monthView: ViewStyle;
  monthText?: TextStyle;
};

export const HitResultByMonthStyles: HitResultByMonthStyle = {
  monthView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: HitRecordColors.secondary,
  },
};

export const HitResultBaseStyles: { hitResultBaseContainer: ViewStyle } = {
  hitResultBaseContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: HitRecordColors.gray,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: HitRecordColors.background,
  },
};

export const EditHitDataOfDateStyles: ShowDateHitDataStyle = {
  container: {
    backgroundColor: HitRecordColors.background,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  text: {},
  datasView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "stretch",
    // borderWidth: 1, // 画面構成に違和感があるため削除
    backgroundColor: HitRecordColors.background,
  },
  dataView: {
    flex: 1,
    backgroundColor: HitRecordColors.background,
  },
};
