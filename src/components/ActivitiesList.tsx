import { Icon, Text } from "@ui-kitten/components";
import React, { useMemo } from "react";
import ActivityCard from "./ActivityCard";
import { ScrollView, StyleSheet, View } from "react-native";
import { Activity } from "../utils/mock";
import { format, fromUnixTime } from "date-fns";

interface ActivitiesListProps {
  selectedDate: Date;
  activities: { [date: string]: Activity[] };
  handleDeleteActivity: (id: string, date: Date) => void;
}

const ActivitiesList = ({
  selectedDate,
  activities,
  handleDeleteActivity,
}: ActivitiesListProps) => {
  const todayActivities = useMemo(() => {
    const formattedDate = format(new Date(selectedDate), "dd/MM/yyyy");
    const todayHasActivities = Object.keys(activities).find(
      (date) => date === formattedDate
    );
    return todayHasActivities ? activities[formattedDate] : [];
  }, [selectedDate, activities]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {todayActivities && todayActivities.length ? (
          todayActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              handleDeleteActivity={handleDeleteActivity}
            />
          ))
        ) : (
          <View style={{ alignItems: "center", marginTop: 100, gap: 20 }}>
            <Text category="h5">No activities today!</Text>
            <Icon
              name="calendar-outline"
              fill="#FFFFFF30"
              style={styles.icon}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: "auto" },
  scroll: {
    paddingHorizontal: 20,
    gap: 10,
    display: "flex",
  },
  icon: {
    width: 60,
    height: 60,
  },
});

export default ActivitiesList;
