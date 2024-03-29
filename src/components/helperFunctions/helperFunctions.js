export function capitalizeWord(string) {
  if (!string) {
    return;
  }
  //Convert to string if not already a string, then capitalize only the first letter
  return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);
}

export function titleCase(string) {
  if (!string) {
    return;
  } else {
    const titleCase = string
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');

    return titleCase;
  }
}

export const formatDate = (date, dateOnly, expandedDateForm) => {
  const dateInput = new Date(date);

  const year = dateInput.getFullYear();
  const month = dateInput.getMonth() + 1;
  const day = dateInput.getDate();
  const hours = dateInput.getHours();
  const minutes = String(dateInput.getMinutes()).padStart(2, '0');
  const seconds = String(dateInput.getSeconds()).padStart(2, '0');

  if (dateOnly) {
    if (expandedDateForm) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const formatedDateExpanded = `${months[month]} ${days[day]}, ${year}`;
      return formatedDateExpanded;
    }
    const formatedDateOnly = `${month < 10 ? `0` + month : month}/${
      day < 10 ? `0` + day : day
    }/${year}`;
    return formatedDateOnly;
  }

  const formatedDateTime = `${month}/${day}/${year} ${
    hours > 12 ? hours - 12 : hours
  }:${minutes}:${seconds} ${hours > 12 ? 'PM' : 'AM'}`;

  return formatedDateTime;
};

export const getToday = (mmddyyyy) => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  if (mmddyyyy) {
    // return mm/dd/yyyy format
    today = `${mm}/${dd}/${yyyy}`;
    return today;
  } else {
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }
};

// Gets the current day of the week
export const getDayOfWeek = (date) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (!date) {
    const curDate = new Date();
    const day = days[curDate.getDay()];
    return day;
  } else {
    const day = days[date.getDay()];
    return day;
  }
};

// gets ISO date without the time section
export const ISOdateOnly = (date) => {
  const dateOnly = date.split('T')[0];
  return dateOnly;
};

// Used to enable/disable for inputs
export const formEditMode = (editMode) => {
  if (editMode) {
    const elements = [...document.getElementsByClassName('editable')];

    elements.map((el) => {
      return (el.disabled = false);
    });
  } else {
    const elements = [...document.getElementsByClassName('editable')];
    elements.map((el) => {
      return (el.disabled = true);
    });
  }
};

// highlights form inputs that caused the form to be rejected
export const invalidInput = (elId) => {
  if (Array.isArray(elId)) {
    elId.map((el) => {
      return (document.getElementById(el).style.backgroundColor = '#ffc9c9');
    });
  } else {
    document.getElementById(elId).style.backgroundColor = '#ffc9c9';
  }
};

//Returns an array with the first element being the available rooms grouped by unit. The second element being a complete array of all available room IDs from all units.
export const roomsAvailableByUnit = (rooms, patients, curPatient) => {
  //checks what rooms are currently occupied by other patients, ommiting the room the CURRENT patient is in if that data is provided.
  const occupiedRooms = curPatient
    ? patients.flatMap((patient) => {
        return patient.roomNumber._id !== curPatient.roomNumber._id
          ? patient.roomNumber._id
          : [];
      })
    : patients.map((patient) => {
        return patient.roomNumber._id;
      });

  //filter out the rooms that are occupied by other patients
  const availableRooms = rooms.filter((room) => {
    return !occupiedRooms.includes(room._id);
  });

  const units = [...new Set(availableRooms.map((room) => room.unit.unitName))];

  const availableRoomsByUnit = units.map((unit) => {
    const result = availableRooms.filter((room) => room.unit.unitName === unit);

    return { [unit]: result };
  });
  return [availableRoomsByUnit, availableRooms];
};
