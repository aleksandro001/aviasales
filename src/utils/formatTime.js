const convertToString = (hours, minutes, travelTime = false) => {
  if (travelTime) {
    return `${hours.toString().padStart(2, '0')}ч  ${minutes.toString().padStart(2, '0')}м`;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const getTravelTime = (duration) => {
  const hours = Math.trunc(duration / 60);
  const min = duration % 60;

  return convertToString(hours, min, true);
};

const getDepartureTime = (departureDate) => {
  const date = new Date(departureDate);
  const hours = date.getHours();
  const min = date.getMinutes();

  return convertToString(hours, min);
};

const getArrivalTime = (departureDate, duration) => {
  const date = new Date(departureDate);
  let hours = date.getHours() + Math.trunc(duration / 60);
  const min = (date.getMinutes() + duration) % 60;
  if (hours > 24) {
    hours -= 24;
  }

  return convertToString(hours, min);
};

export { getTravelTime, getDepartureTime, getArrivalTime };
