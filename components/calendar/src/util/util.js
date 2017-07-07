export const addZoroPrefix = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const getDaysOfMonth = (year, month) => {
  var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month == 2 && (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)) {
 	return 29;
  }
  return daysOfMonth[month - 1];
};

export const getFirstDay = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};