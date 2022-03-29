const sortItBro = (current: any, next: any, order: 'asc' | 'desc') => {
  if (isNumber(current) && isNumber(next)) {
    if (order === 'asc') return current - next;
    return next - current;
  }
  if (typeof current === 'boolean' && typeof next === 'boolean') {
    if (order === 'asc') return Number(current) - Number(next);
    return Number(next) - Number(current);
  } else if (typeof current === 'string' && typeof next === 'string') {
    if (current.toLowerCase() < next.toLowerCase()) {
      if (order === 'asc') return 1;
      return -1;
    }
    if (current.toLowerCase() > next.toLowerCase()) {
      if (order === 'asc') return -1;
      return 1;
    }
    return 0;
  } else {
    if (order === 'asc') return -1;
    return 1;
  }
};

// function isNumber(n: any) {
//   return !isNaN(parseFloat(n)) && !isNaN(n - 0);
// }

function isNumber(n: any) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

export default sortItBro;
