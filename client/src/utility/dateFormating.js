export const DateFormating = (value) => {
  const date = new Date(value);
  const date2 = new Date();
  if (
    date.getDate() === date2.getDate() &&
    date.getMonth() === date2.getMonth()
  ) {
    return "Today";
  } else if (
    Math.abs(date.getDate() - date2.getDate()) < 7 &&
    date.getMonth() === date2.getMonth()
  ) {
    return "This Week";
  } else if (
    Math.abs(date.getDate() - date2.getDate()) >= 7 &&
    date.getMonth() === date2.getMonth()
  ) {
    return "This Month";
  } else if (Math.abs(date.getFullYear() - date2.getFullYear()) > 2) {
    return "More Than Two Years";
  } else if (Math.abs(date.getFullYear() - date2.getFullYear()) === 2) {
    return "Two Years ago";
  } else if (date.getFullYear() < date2.getFullYear()) {
    return "Year ago";
  } else if (Math.abs(date.getMonth() - date2.getMonth()) === 5) {
    return "Half a Year ago";
  } else if (Math.abs(date.getMonth() - date2.getMonth()) === 4) {
    return "4 Months ago";
  } else if (Math.abs(date.getMonth() - date2.getMonth()) === 3) {
    return "3 Months ago";
  } else if (Math.abs(date.getMonth() - date2.getMonth()) === 2) {
    return "Two Months ago";
  } else if (Math.abs(date.getMonth() - date2.getMonth()) === 1) {
    return "Last Month";
  }
};
