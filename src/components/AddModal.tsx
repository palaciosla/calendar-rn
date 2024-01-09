import {
  Avatar,
  Button,
  Calendar,
  Card,
  Datepicker,
  IndexPath,
  Input,
  Modal,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  ActivitiesType,
  Activity,
  DURATION_TIME,
  PROFILES,
  TYPE_OF_ACTIVITIES,
} from "../utils/mock";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getAmPm } from "../utils/utils";
import * as yup from "yup";
import { Formik, useFormik } from "formik";

interface AddModalProps {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  setActivities: React.Dispatch<
    React.SetStateAction<{
      [date: string]: Activity[];
    }>
  >;
}

type FormData = {
  name: string;
  date: Date;
  time: Date | null;
  type: string;
  duration: string;
  selectedUserIds: number[];
};

const schema = yup.object().shape({
  name: yup.string().trim().required("This field is required"),
  type: yup.string().trim().required("This field is required"),
  selectedUserIds: yup.array().min(2, "Must to be 2  selected users at least"),
  time: yup.string().trim().required("This field is required"),
});

const INITIAL_FORM_DATA: FormData = {
  name: "",
  date: new Date(),
  time: null,
  type: "",
  duration: "15 min",
  selectedUserIds: [],
};

const AddModal = ({
  modalIsOpen,
  handleCloseModal,
  setActivities,
}: AddModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState<
    IndexPath[]
  >([]);

  const groupDisplayValues = (values: number[]) =>
    values
      .map((id) => {
        return PROFILES.find((prof) => prof.id === id)?.name;
      })
      .join(", ");

  const createNewActivity = async (values: FormData) => {
    const newActivity = {
      id: new Date(),
      ...values,
    };

    setActivities((prev) => {
      const prevActivities = prev[values.date.toLocaleDateString()] || [];
      return {
        ...prev,
        [values.date.toLocaleDateString() as any]: [
          ...prevActivities,
          newActivity,
        ],
      };
    });
    handleCloseModal();
  };

  const { values, setFieldValue, errors, resetForm } = useFormik<FormData>({
    initialValues: INITIAL_FORM_DATA,
    onSubmit: (values) => {
      createNewActivity(values);
      resetForm();
      setMultiSelectedIndex([]);
    },
  });

  return (
    <Modal
      visible={modalIsOpen}
      backdropStyle={styles.backdrop}
      style={{ width: "90%" }}
    >
      <Card style={styles.gap}>
        <View style={styles.gap}>
          <Text category="h6" style={{ textAlign: "center" }}>
            CREATE ACTIVITY
          </Text>
          <Formik
            initialValues={INITIAL_FORM_DATA}
            onSubmit={(values) => createNewActivity(values)}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <>
                <View style={styles.gap}>
                  <View>
                    <Input
                      placeholder="Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      status={errors.name ? "danger" : "primary"}
                    />
                    {errors.name && (
                      <Text
                        status="danger"
                        style={{ paddingTop: 5, fontSize: 12 }}
                      >
                        {errors.name}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Select
                      status={errors.type ? "danger" : "primary"}
                      placeholder={"Type"}
                      onSelect={(index) => {
                        setFieldValue(
                          "type",
                          TYPE_OF_ACTIVITIES[
                            (index as IndexPath).row
                          ] as ActivitiesType
                        );
                      }}
                      value={values.type}
                    >
                      {TYPE_OF_ACTIVITIES.map((type, index) => (
                        <SelectItem title={type} key={index} />
                      ))}
                    </Select>
                    {errors.type && (
                      <Text
                        status="danger"
                        style={{ paddingTop: 5, fontSize: 12 }}
                      >
                        {errors.type}
                      </Text>
                    )}
                  </View>

                  <View>
                    <Select
                      placeholder={"Users"}
                      multiSelect={true}
                      status={errors.selectedUserIds ? "danger" : "primary"}
                      value={groupDisplayValues(values.selectedUserIds)}
                      selectedIndex={multiSelectedIndex}
                      onSelect={(index) => {
                        const currentIndex = index as IndexPath[];
                        const selectedUsersIds = currentIndex.map(
                          (idx) => PROFILES[idx.row].id
                        );
                        setFieldValue("selectedUserIds", selectedUsersIds);
                        setMultiSelectedIndex(currentIndex);
                      }}
                    >
                      {PROFILES.map((prof) => (
                        <SelectItem
                          title={`${prof.name}`}
                          key={prof.id}
                          accessoryRight={() => (
                            <Avatar
                              source={require("../../assets/profile-icon3.png")}
                              size="small"
                            />
                          )}
                        />
                      ))}
                    </Select>

                    {errors.selectedUserIds && (
                      <Text
                        status="danger"
                        style={{ paddingTop: 5, fontSize: 12 }}
                      >
                        {errors.selectedUserIds}
                      </Text>
                    )}
                  </View>
                  <Datepicker
                    date={values.date}
                    onSelect={(date) => setFieldValue("date", date)}
                    status={errors.date ? "danger" : "primary"}
                  />
                  <View>
                    <Input
                      onFocus={() => Keyboard.dismiss()}
                      onPressIn={() => setOpen(true)}
                      value={values.time?.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                      placeholder="Start time"
                      editable={false}
                      status={errors.time ? "danger" : "primary"}
                    />
                    {errors.time && (
                      <Text
                        status="danger"
                        style={{ paddingTop: 5, fontSize: 12 }}
                      >
                        {errors.time}
                      </Text>
                    )}
                  </View>
                  <Select
                    placeholder={"Duration"}
                    status={errors.duration ? "danger" : "primary"}
                    onSelect={(index) => {
                      setFieldValue(
                        "duration",
                        DURATION_TIME[(index as IndexPath).row]
                      );
                    }}
                    value={values.duration}
                  >
                    {DURATION_TIME.map((duration) => (
                      <SelectItem title={duration} key={duration} />
                    ))}
                  </Select>
                  {open && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={values.time || new Date()}
                      mode="time"
                      is24Hour={true}
                      minuteInterval={15}
                      display="spinner"
                      onChange={(time) => {
                        setFieldValue(
                          "time",
                          new Date(time.nativeEvent.timestamp as number)
                        );
                        setOpen(false);
                      }}
                    />
                  )}
                  {values.time && values.date && values.duration && (
                    <Text
                      style={{ textAlign: "center", fontWeight: "800" }}
                    >{`${values.date.toLocaleDateString()} - ${values.time.getHours()}:${values.time.getMinutes()} ${getAmPm(
                      values.time
                    )} - ${values.duration}`}</Text>
                  )}
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      handleCloseModal();
                      setMultiSelectedIndex([]);
                    }}
                    size="small"
                  >
                    CLOSE
                  </Button>
                  <Button onPress={() => handleSubmit()} size="small">
                    CREATE
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  gap: { gap: 20 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
});

export default AddModal;
