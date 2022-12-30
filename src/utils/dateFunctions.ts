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
