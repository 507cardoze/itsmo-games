const isBoolean = (value: unknown) => {
  if (typeof value === 'string') {
    if (value === 'true') {
      return true;
    } else {
      return false;
    }
  } else {
    if (value) {
      return true;
    } else {
      return false;
    }
  }
};

export default isBoolean;
