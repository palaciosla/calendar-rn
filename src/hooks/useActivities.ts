import { useEffect, useState } from "react";
import { Activity } from "../utils/mock";
import { CreateFormData } from "../components/AddModal";
import { db } from "../../credentials";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { fromUnixTime, format, formatISO } from "date-fns";

export const getDate = (date: string) => {
  return format(date, "dd/MM/yyyy");
};

const useActivities = () => {
  const [activities, setActivities] = useState<{
    [key: string]: Activity[];
  }>({});

  const deleteActivity = async (id: string, date: Date) => {
    try {
      await deleteDoc(doc(db, "activities", id));
      let formattedDate = format(date, "dd/MM/yyyy");
      setActivities((prev) => {
        let filteredActivities = prev[formattedDate].filter(
          (act) => act.id !== id
        );
        return { ...prev, [formattedDate]: filteredActivities };
      });
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const createActivity = async (values: CreateFormData) => {
    const newActivity = {
      id: new Date(),
      ...values,
    };

    try {
      const docRef = await addDoc(collection(db, "activities"), newActivity);
      console.log("Document written with ID: ", docRef.id);
      setActivities((prev) => {
        let date = format(values.date, "dd/MM/yyyy");
        const prevActivities = prev[date] || [];
        return {
          ...prev,
          [date as any]: [...prevActivities, newActivity],
        };
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchActivities = async () => {
    await getDocs(collection(db, "activities")).then((res) => {
      const newData = res.docs.map((doc) => {
        let data = doc.data();
        return {
          ...data,
          id: doc.id,
          date: formatISO(fromUnixTime(data.date.seconds)),
          time: formatISO(fromUnixTime(data.time.seconds)),
        };
      });
      setActivities(
        newData.reduce((acc, cur) => {
          let date = getDate(cur.date);
          let exist = Object.keys(acc).find((key) => key === date);
          return exist
            ? { ...acc, [date]: [...acc[date], cur] }
            : { ...acc, [date]: [cur] };
        }, {} as any)
      );
    });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return { activities, setActivities, deleteActivity, createActivity };
};

export default useActivities;
