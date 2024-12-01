//Create 2D Array: I
const rows = 3;
const cols = 4;
const initialValue = 0;

const array2D = Array.from({ length: rows }, () =>
  Array(cols).fill(initialValue)
);
