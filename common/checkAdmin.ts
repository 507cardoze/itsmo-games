const checkAdmin = (path: string, isAdmin: boolean | null | undefined) => {
  const adminPath = ['/admin-panel'];
  if (adminPath.includes(path) && !isAdmin) return true;
  return false;
};

export default checkAdmin;
