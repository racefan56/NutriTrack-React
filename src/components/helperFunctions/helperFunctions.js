export function capitalizeWord(string) {
  //Convert to string if not already a string, then capitalize only the first letter
  return (
    string.toString().charAt(0).toUpperCase() +
    string.toString().slice(1).toLowerCase()
  );
}

export function titleCase(string) {
  const titleCase = string
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

  return titleCase;
}

export const formatDate = (date, dateOnly) => {
  const dateInput = new Date(date);

  const year = dateInput.getFullYear();
  const month = dateInput.getMonth() + 1;
  const day = dateInput.getDate();
  const hours = dateInput.getHours();
  const minutes = String(dateInput.getMinutes()).padStart(2, '0');
  const seconds = String(dateInput.getSeconds()).padStart(2, '0');

  if (dateOnly) {
    const formatedDateOnly = `${month}/${day}/${year}`;
    return formatedDateOnly;
  }

  const formatedDateTime = `${month}/${day}/${year} ${
    hours > 12 ? hours - 12 : hours
  }:${minutes}:${seconds} ${hours > 12 ? 'PM' : 'AM'}`;

  return formatedDateTime;
};
