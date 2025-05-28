import { TextStyle, ViewStyle } from "react-native";
import { HitRecordColors } from "../../../styles/constants/colors/HitRecordColors";

type ShowDateHitDataStyle = {
  container: ViewStyle;
  text: TextStyle
};

export const hitResultByDateStyles: ShowDateHitDataStyle = {
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 15,
    marginHorizontal: 10,
    
  },
  text: {
    fontSize: 16,
    color: HitRecordColors.primary,
  },
};

export const HitResultBaseStyles: { hitResultBaseContainer: ViewStyle } = {
  hitResultBaseContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 1,
    padding: 15,
    marginHorizontal: 10,
    backgroundColor: HitRecordColors.background,
  },
};

export const EditHitDataOfDateStyles: ShowDateHitDataStyle = {
    container: {
        backgroundColor: HitRecordColors.background,
        flex: 1,
        width: "100%",
    },
    text: {

    }
}