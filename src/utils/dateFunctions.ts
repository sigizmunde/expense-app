export const getWeekStart = (date: Date) => {
  const newMonthDay = date.getDate() - date.getDay();
  date.setDate(newMonthDay);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return new Date(date);
};

export const getWeekEnd = (date: Date) => {
  const newMonthDay = date.getDate() - date.getDay() + 7;
  date.setDate(newMonthDay);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return new Date(date);
};

export const getDayAWeekAgo = (date: Date) => {
  const newMonthDay = date.getDate() - 7;
  date.setDate(newMonthDay);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return new Date(date);
};

export const getDateWithDefaultTime = (date: Date) => {
  const newMonthDay = date.getDate();
  date.setDate(newMonthDay);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return new Date(date);
};

export const getDayName = (day: number) => {
  const dayNum = day % 7;
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][dayNum];
};
