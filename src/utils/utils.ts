export const durationToMinutes = (duration: string): number => {
  const durationMap: { [key: string]: number } = {
    "15 min": 15,
    "30 min": 30,
    "1 hour": 60,
    "1 hour 30 min": 90,
    "2 hours": 120,
  };

  return durationMap[duration] || 0;
};

export const addDurationToTime = (time: Date, duration: string): Date => {
  const minutesToAdd = durationToMinutes(duration);
  const date = new Date(time);
  const newTime = new Date(date.getTime() + minutesToAdd * 60000);
  return newTime;
};

export const getAmPm = (time: Date): string => {
  const hours = time.getHours();
  return hours >= 12 ? "PM" : "AM";
};
