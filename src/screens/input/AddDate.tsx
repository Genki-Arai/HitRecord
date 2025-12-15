import RNDateTimePicker, {
  DateTimePickerAndroid,
  RCTDateTimePickerNative,
} from "@react-native-community/datetimepicker";
import { Text, View, Button, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerPractice from "../../components/practice/DateTimePickerPractice";
import ModalDateTimePickerPractice from "../../components/practice/ModalDateTimePickerPractice";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AddDataAreaStyles, hitResultByDateStyles } from "../../styles/input/StylesOfInput";

type AddDataOfDateProps = {
  date: string;
  setDate: (date: string) => void;
};

export default (props: AddDataOfDateProps) => {
  const { date, setDate } = props;

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate.toLocaleDateString("ja-JP", {timeZone: "Asia/Tokyo"}));
    hideDatePicker();
  };

  return (
    <View>
      {/* <Text>Date: {date}</Text> */}
      
      <TouchableOpacity onPress={showDatePicker} style={AddDataAreaStyles.addItem}>
        <Text style={AddDataAreaStyles.addItemText}>日時</Text>
        <Text style={AddDataAreaStyles.addItemText}>{date ? date : "日付未選択"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal 
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="ja_JP"
      />


      {/* <ModalDateTimePickerPractice /> */}
      
      
    </View>
  );
};
