const sortItBro = (current: any, next: any, order: 'asc' | 'desc') => {
  if (
    current === null ||
    current === undefined ||
    next === null ||
    next === undefined
  )
    return 0;
  if (isNumber(current) && isNumber(next)) {
    if (order === 'asc') return current - next;
    return next - current;
  } else {
    if (current.toLowerCase() < next.toLowerCase()) {
      if (order === 'asc') return 1;
      return -1;
    }
    if (current.toLowerCase() > next.toLowerCase()) {
      if (order === 'asc') return -1;
      return 1;
    }
    return 0;
  }
};

// function isNumber(n: any) {
//   return !isNaN(parseFloat(n)) && !isNaN(n - 0);
// }

function isNumber(n: any) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

export default sortItBro;
