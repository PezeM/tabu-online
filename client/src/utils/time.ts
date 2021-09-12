export const formatTimeToMmSsFormat = (seconds: number) => {
  const format = (number: number) => `0${Math.floor(number)}`.slice(-2);

  const minutes = (seconds % 3600) / 60;

  return [minutes, seconds % 60].map(format).join(':');
};
