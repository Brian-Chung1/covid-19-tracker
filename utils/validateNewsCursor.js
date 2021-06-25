//https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
export const validateNewsCursor = (cursor) => {
  if (cursor.includes('.') || parseInt(cursor) < 0) {
    return false;
  }

  return !isNaN(cursor) && !isNaN(parseFloat(cursor));
};
