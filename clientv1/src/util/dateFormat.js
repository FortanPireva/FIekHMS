const dateFormatter = (customDate) => {
  if (!customDate) return;
  const date = new Date(customDate);
  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = dateTimeFormat.formatToParts(date);

  return `${day}-${month}-${year}`;
};
export default dateFormatter;
