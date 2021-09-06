export default (date: number) => {
  const newDate = new Date(date);
  const hour = `0${newDate.getHours()}`.slice(-2);
  const minutes = `0${newDate.getMinutes()}`.slice(-2);

  const dateStr = `${hour}:${minutes}`;

  return dateStr;
};
