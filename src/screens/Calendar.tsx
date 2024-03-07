import Header from "../components/Header";
import ActivitiesList from "../components/ActivitiesList";
import CalendarItem from "../components/CalendarItem";
import { Suspense, useState } from "react";
import AddModal from "../components/AddModal";
import useActivities from "../hooks/useActivities";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

const Calendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { activities, deleteActivity, createActivity, loading } =
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
          loading={loading}
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
