import { Button, Calendar, StyleType, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Icon } from "@ui-kitten/components";
import { ActivityDate } from "../utils/mock";
import { CalendarDateInfo } from "@ui-kitten/components/ui/calendar/type";
import { theme } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

interface CalendarItemProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  activities: ActivityDate;
}

const CalendarItem = ({
  selectedDate,
  setSelectedDate,
  activities,
}: CalendarItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [position] = useState(new Animated.Value(-440));

  const renderDay = (
    info: CalendarDateInfo<Date>,
    style: StyleType
  ): React.ReactElement => {
    const isToday = isSameDay(info.date, new Date());
    const isSelected = isSameDay(info.date, selectedDate);
    const hasActivities = activities[format(selectedDate, "dd/MM/yyyy")];
    return (
      <View style={styles.dayContainer}>
        <Text
          style={[
            style.container,
            styles.day,
            {
              backgroundColor: isSelected
                ? theme.colors.secondary[400]
                : isToday
                ? theme.colors.secondary[500]
                : "transparent",
            },
          ]}
        >
          {info.date.getUTCDate()}
        </Text>
        {hasActivities && hasActivities.length && (
          <View
            style={{
              backgroundColor: theme.colors.primary[400],
              width: 6,
              height: 6,
              borderRadius: 3,
              position: "absolute",
              top: 5,
              right: 5,
            }}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    Animated.timing(position, {
      toValue: isOpen ? 0 : -390,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, position]);

  return (
    <Animated.View style={{ ...styles.container, bottom: position }}>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={styles.openButton}
      >
        <Icon
          style={styles.icon}
          fill="#8F9BB3"
          name={
            isOpen ? "arrow-ios-downward-outline" : "arrow-ios-upward-outline"
          }
        />
      </TouchableOpacity>
      <Calendar
        date={selectedDate}
        onSelect={(nextDate) => setSelectedDate(nextDate)}
        style={styles.calendar}
        renderDay={renderDay}
      />
      {/* <Button style={styles.button}>CONFIRM</Button> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 40,
    backgroundColor: theme.colors.secondary[600],
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    gap: 0,
    alignItems: "center",
    position: "absolute",
    width: "100%",
    overflow: "hidden",
    height: 450,
  },
  calendar: { width: "100%", height: "80%", borderColor: "transparent" },
  button: {
    width: "50%",
    backgroundColor: theme.colors.secondary[500],
    borderColor: "transparent",
  },
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
  openButton: {
    width: "90%",
    marginTop: 10,
  },
  icon: {
    width: 44,
    height: 44,
  },
});

export default CalendarItem;
