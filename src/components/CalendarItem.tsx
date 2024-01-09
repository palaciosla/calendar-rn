import { Button, Calendar, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";

interface CalendarItemProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarItem = ({ selectedDate, setSelectedDate }: CalendarItemProps) => {
  return (
    <View style={styles.container}>
      <Calendar
        date={selectedDate}
        onSelect={(nextDate) => setSelectedDate(nextDate)}
        style={styles.calendar}
      />
      <Button style={styles.button}>CONFIRM</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: "#e33255",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    gap: 25,
    alignItems: "center",
  },
  calendar: { width: "100%", height: "80%", borderColor: "transparent" },
  button: {
    width: "50%",
    backgroundColor: "#c21e3a",
    borderColor: "transparent",
  },
});

export default CalendarItem;
