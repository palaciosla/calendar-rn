import { Icon, Text } from "@ui-kitten/components";
import React, { useMemo } from "react";
import ActivityCard from "./ActivityCard";
import { ScrollView, StyleSheet, View } from "react-native";
import { Activity } from "../utils/mock";

interface ActivitiesListProps {
  selectedDate: Date;
  activities: { [date: string]: Activity[] };
  handleDeleteActivity: (id: number, date: Date) => void;
  handleOpenSnackbar: (message: string) => void;
}

const ActivitiesList = ({
  selectedDate,
  activities,
  handleDeleteActivity,
  handleOpenSnackbar,
}: ActivitiesListProps) => {
  const todayActivities = useMemo(() => {
    const formattedDate = selectedDate.toLocaleDateString();
    const todayHasActivities = Object.keys(activities).find(
      (day) => day === formattedDate
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
              handleOpenSnackbar={handleOpenSnackbar}
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
  container: { height: 300 },
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
