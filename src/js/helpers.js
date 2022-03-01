export const convertCtoF = function (tempC) {
  return tempC * 1.8 + 32;
};

export const convertFtoC = function (tempF) {
  return (tempF - 32) / 1.8;
};
