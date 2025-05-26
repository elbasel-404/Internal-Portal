export const formatNewsDate = (date: Date) => {
  const dateToFormat = new Date(date);
  const day = dateToFormat.toLocaleString("en-US", { day: "2-digit" });
  const month = dateToFormat.toLocaleString("en-US", { month: "2-digit" });
  const year = dateToFormat.toLocaleString("en-US", { year: "numeric" });
  let hours = dateToFormat.getHours();
  const minutes = dateToFormat.getMinutes().toString().padStart(2, "0");
  const period = hours < 12 ? "صباحًا" : "مساءً";
  hours = hours % 12 || 12;
  const hourString = hours.toString().padStart(2, "0");
  return `${day}.${month}.${year} - ${hourString}:${minutes} ${period}`;
};
