const formatDate = (date, dateOnly) => {
  const dateInput = new Date(date);

  const year = dateInput.getFullYear();
  const month = dateInput.getMonth() + 1;
  const day = dateInput.getDate();
  const hours = dateInput.getHours();
  const minutes = dateInput.getMinutes();
  const seconds = dateInput.getSeconds();
  const dayOfWeek = dateInput.getDay();

  if (dateOnly) {
    const formatedDateOnly = `${month}/${day}/${year}`;
    return formatedDateOnly;
  }

  const formatedDateTime = `${month}/${day}/${year} ${
    hours > 12 ? hours - 12 : hours
  }:${minutes}:${seconds} ${hours > 12 ? 'PM' : 'AM'}`;
  return formatedDateTime;
};

export default formatDate;
