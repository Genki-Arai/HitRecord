import { useNavigation } from "@react-navigation/native"
import { Button, Text, View } from "react-native";
import BottomSheetPractice from "../../components/practice/BottomSheetPractice";
import { HitRecordColors } from "../../styles/constants/colors/HitRecordColors";


export default () => {
    

    return (
        <View style={{height: '100%', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: HitRecordColors.error}}>
            <Text>メモ画面</Text>
            <BottomSheetPractice />
        </View>
    )
}