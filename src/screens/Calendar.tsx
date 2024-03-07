import Header from "../components/Header";
import ActivitiesList from "../components/ActivitiesList";
import CalendarItem from "../components/CalendarItem";
import { useState } from "react";
import AddModal from "../components/AddModal";
import useActivities from "../hooks/useActivities";
import Layout from "../components/Layout";

const Calendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { activities, deleteActivity, createActivity } =
    useActivities();

  const handleCloseModal = () => setModalIsOpen(false);
  return (
    <Layout>
      <>
        <Header setModalIsOpen={setModalIsOpen} />
        <ActivitiesList
          selectedDate={selectedDate}
          activities={activities}
          handleDeleteActivity={deleteActivity}
        />
        <CalendarItem
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          activities={activities}
        />
        <AddModal
          modalIsOpen={modalIsOpen}
          handleCloseModal={handleCloseModal}
          createActivity={createActivity}
        />
      </>
    </Layout>
  );
};

export default Calendar;
