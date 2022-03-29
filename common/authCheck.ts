import {User} from 'firebase/auth';
import {firestoreUserType} from '../redux/slices/user-slice';

const authCheck = (
  currentUser: firestoreUserType | User | null,
  path: string,
  isAdmin: boolean | undefined,
) => {
  const privatePaths = ['/perfil', '/dashboard', '/admin-panel'];
  const adminPath = ['/admin-panel'];
  if (!currentUser && privatePaths.includes(path)) {
    return true;
  }
  if (!isAdmin && adminPath.includes(path)) {
    return true;
  }
  return false;
};

export default authCheck;
