const monthsString = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateTimePretty = (datetime: string) => {
  const date = datetime.split("T")[0];
  const dateParts = date.split("-");
  return `${dateParts[2]} ${monthsString[parseInt(dateParts[1]) - 1]} ${dateParts[0]}`;
};
