import convertHours from './convertHours';

export default (date: number, divider: string, timestamp = false, yearFormat: 'full' | 'condensed' = 'condensed') => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = `0${newDate.getMonth() + 1}`.slice(-2);
  const day = `0${newDate.getDate()}`.slice(-2);

  const dateStr = `${day}${divider}${month}${divider}${yearFormat === 'full' ? year : year.toString().substr(2, 2)}${
    timestamp ? ` ${convertHours(date)}` : ''
  }`;

  return dateStr;
};
