export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return `${formattedDate} | ${formattedTime}`;
};