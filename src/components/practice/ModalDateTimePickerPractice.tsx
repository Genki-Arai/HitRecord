import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ModalDateTimePickerPractice = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {selectedDate ? selectedDate.toLocaleDateString() : "日付未選択"}
      </Text>
      
      <Button title="日付を選択" onPress={showDatePicker} />
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        // 日本語化したい場合（iOS）
        locale="ja_JP" 
        // iOSで以前のようなドラムロールにしたい場合など指定可能
        // display="inline" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 18,
  }
});

export default ModalDateTimePickerPractice;