/*
  This utility returns the end of the day in a given date
*/
const toFinalDay = (date: Date): Date => {
  // Adds one day
  let convertDate: Date = new Date(date.setDate(date.getDate() + 1));

  // Removes one second
  convertDate = new Date(convertDate.setSeconds(convertDate.getSeconds() - 1));
  return convertDate;
};

export { toFinalDay };
