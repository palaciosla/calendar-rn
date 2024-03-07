import { StyleType, Text } from "@ui-kitten/components";
import { CalendarDateInfo } from "@ui-kitten/components/ui/calendar/type";
import { StyleSheet, View } from "react-native";
import { ActivityDate } from "../utils/mock";

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const CustomDay = ({
  info,
  selectedDate,
  style,
  activities,
}: {
  info: CalendarDateInfo<Date>;
  selectedDate: Date;
  style: StyleType;
  activities: ActivityDate;
}) => {
  const isToday = isSameDay(info.date, new Date());
  const isSelected = isSameDay(info.date, selectedDate);
  const hasActivities = activities[selectedDate.toLocaleDateString()];
  return (
    <View style={styles.dayContainer}>
      <Text
        style={[
          style.container,
          styles.day,
          {
            backgroundColor: isSelected
              ? "#c21e5a"
              : isToday
              ? "#c21e3a"
              : "transparent",
          },
        ]}
      >
        {info.date.getUTCDate()}
      </Text>
      <View
        style={{
          backgroundColor: "#c21e8a",
          width: 6,
          height: 6,
          borderRadius: 3,
          position: "absolute",
          top: 5,
          right: 5,
          display: hasActivities ? "flex" : "none",
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    borderColor: "transparent",
    display: "flex",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    minWidth: 50,
    textAlign: "center",
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
    borderColor: "transparent",
  },
});

export default CustomDay;
