import { Icon, Text } from "@ui-kitten/components";
import React, { useContext } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { Activity } from "../utils/mock";
import UserList from "./UserList";
import { addDurationToTime, getAmPm } from "../utils/utils";
import { Swipeable } from "react-native-gesture-handler";
import { fromUnixTime, getHours, getMinutes } from "date-fns";
import { AuthContext, AuthState } from "../context/AuthProvider";

const getTypeIcon = (type: Activity["type"]) => {
  switch (type) {
    case "Daily":
      return <Icon name="people-outline" style={styles.icon} fill="#FFF" />;
    case "Meeting":
      return <Icon name="phone-call-outline" style={styles.icon} fill="#FFF" />;
    case "Review":
      return <Icon name="skip-back-outline" style={styles.icon} fill="#FFF" />;
    default:
      break;
  }
};

const renderRightActions = (
  progress: any,
  dragX: any,
  handleDeleteActivity: (id: string, date: Date) => void,
  activity: Activity,
  handleOpenSnackbar: (message: string) => void
) => {
  const transOpacity = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const transBackgroundColor = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: ["#191e31", "#191e31"],
    extrapolate: "clamp",
  });
  const transScale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        height: "93%",
        marginTop: 3,
        borderRadius: 10,
        opacity: transOpacity,
        backgroundColor: transBackgroundColor,
        transform: [{ scaleX: transScale }, { scaleY: transScale }],
      }}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleDeleteActivity(activity.id, activity.date)}
      >
        <Icon name="trash-outline" style={styles.smallIcon} fill="#c21e3a" />
      </TouchableOpacity>
      <View
        style={{ width: 1, height: "100%", backgroundColor: "#ffffff20" }}
      />
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => handleOpenSnackbar("A notification was sent!")}
      >
        <Icon name="bell-outline" style={styles.smallIcon} fill="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const ActivityCard = ({
  activity,
  index,
  handleDeleteActivity,
}: {
  activity: Activity;
  index: number;
  handleDeleteActivity: (id: string, date: Date) => void;
}) => {
  const endTime = addDurationToTime(activity.time, activity.duration);
  const { handleOpenSnackbar } = useContext(AuthContext) as AuthState;

  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(
          progress,
          dragX,
          handleDeleteActivity,
          activity,
          handleOpenSnackbar
        )
      }
      dragOffsetFromRightEdge={50}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: index === 1 ? "#191e31" : "#191e40",
        }}
      >
        <View style={{ flex: 1.3 }}>{getTypeIcon(activity.type)}</View>
        <View style={{ flex: 5 }}>
          <Text category="c1">{`${getHours(activity.time)}:${getMinutes(
            activity.time
          )
            .toString()
            .padStart(2, "0")} - ${endTime.getHours()}:${endTime
            .getMinutes()
            .toString()
            .padStart(2, "0")} ${getAmPm(endTime)}`}</Text>
          <Text category="h6">{activity.name}</Text>
        </View>
        <View style={styles.userListContainer}>
          <UserList users={activity.selectedUserIds} />
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
  userListContainer: {
    flexDirection: "row",
    gap: 10,
    flex: 2,
    alignItems: "center",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  smallIcon: { width: 20, height: 20 },
});

export default ActivityCard;
