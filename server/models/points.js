const Points = {
  INFINITY: -1,
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FIVE: 5,
  EIGHT: 8,
  THIRTEEN: 13,
  TWENTY_ONE: 21
};

function isValidPoint(input) {
  return Object.values(Points).includes(input);
}

module.exports = { Points, isValidPoint };