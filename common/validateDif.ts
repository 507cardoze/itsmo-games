const validateDif = (
  incoming: string | undefined,
  current: string | undefined,
) => {
  if (!current) return incoming;
  if (!incoming) return current;

  if (incoming.toLowerCase() !== current.toLowerCase()) return incoming;
  return current;
};

export default validateDif;
