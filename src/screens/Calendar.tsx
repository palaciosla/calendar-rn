import Header from "../components/Header";
import ActivitiesList from "../components/ActivitiesList";
import CalendarItem from "../components/CalendarItem";
import { View } from "react-native";
import { useState } from "react";
import AddModal from "../components/AddModal";
import { ACTIVITIES } from "../utils/mock";
import Snackbar from "../components/Snackbar";

const Calendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState(ACTIVITIES);
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
  });

  const handleCloseModal = () => setModalIsOpen(false);
  const handleCloseSnackbar = () =>
    setSnackbar({ isVisible: false, message: "" });

  const handleOpenSnackbar = (message: string) => {
    setSnackbar({ isVisible: true, message });
  };

  const handleDeleteActivity = (id: number, date: Date) => {
    let formattedDate = date.toLocaleDateString();
    setActivities((prev) => {
      let filteredActivities = prev[formattedDate].filter(
        (act) => act.id !== id
      );
      return { ...prev, [formattedDate]: filteredActivities };
    });
  };

  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <Header setModalIsOpen={setModalIsOpen} />
      <ActivitiesList
        selectedDate={selectedDate}
        activities={activities}
        handleDeleteActivity={handleDeleteActivity}
        handleOpenSnackbar={handleOpenSnackbar}
      />
      <CalendarItem
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <AddModal
        modalIsOpen={modalIsOpen}
        handleCloseModal={handleCloseModal}
        setActivities={setActivities}
      />
      <Snackbar
        isVisible={snackbar.isVisible}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        actionText="Dismiss"
        onActionPress={handleCloseSnackbar}
        duration={2500}
        position="bottom"
      />
    </View>
  );
};

export default Calendar;
