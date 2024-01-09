export const PROFILES = [
  {
    id: 1,
    name: "Leandro",
    lastName: "Palacios",
    avatar: "../../assets/profile-pic1.jpg",
  },
  {
    id: 2,
    name: "Oscar",
    lastName: "Palacios",
    avatar: "../../assets/profile-pic4.jpg",
  },
  {
    id: 3,
    name: "Lucas",
    lastName: "Palacios",
    avatar: "../../assets/profile-pic5.png",
  },
  {
    id: 4,
    name: "Paul",
    lastName: "Palacios",
    avatar: "../../assets/profile-icon3.png",
  },
  {
    id: 5,
    name: "Eoin",
    lastName: "Palacios",
    avatar: "../../assets/profile-pic6.png",
  },
];

export type Activity = {
  id: number;
  type: "Review" | "Daily" | "Meeting";
  name: string;
  selectedUserIds: number[];
  time: Date;
  duration: string;
  date: Date;
};

type ActivityDate = {
  [key: string]: Activity[];
};

export const ACTIVITIES: ActivityDate = {
  "1/6/2024": [
    {
      id: 1,
      type: "Review",
      name: "Mock 1",
      selectedUserIds: [1, 3, 5],
      duration: "15 min",
      time: new Date(),
      date: new Date(),
    },
    {
      id: 2,
      type: "Daily",
      name: "Mock 2",
      selectedUserIds: [4, 2],
      duration: "30 min",
      time: new Date(),
      date: new Date(),
    },
    {
      id: 3,
      type: "Review",
      name: "Mock 3",
      selectedUserIds: [1, 2, 3],
      duration: "15 min",
      time: new Date(),
      date: new Date(),
    },
  ],
  "1/7/2024": [],
  "1/8/2024": [
    {
      id: 1,
      type: "Daily",
      name: "Mock 13321",
      selectedUserIds: [1, 3, 5],
      duration: "30 min",
      time: new Date(),
      date: new Date(),
    },
    {
      id: 2,
      type: "Daily",
      name: "Mock 232133",
      selectedUserIds: [4, 2],
      duration: "15 min",
      time: new Date(),
      date: new Date(),
    },
    {
      id: 3,
      type: "Review",
      name: "Mock 33213123",
      selectedUserIds: [1, 2, 3],
      duration: "30 min",
      time: new Date(),
      date: new Date(),
    },
  ],
};

export type ActivitiesType = "Meeting" | "Daily" | "Review";

export const TYPE_OF_ACTIVITIES = ["Meeting", "Daily", "Review"];

export const DURATION_TIME = [
  "15 min",
  "30 min",
  "1 hour",
  "1 hour 30 min",
  "2 hours",
];
