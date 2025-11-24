import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signOut } from '../../store/slices/authSlice';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const initials = useMemo(() => {
    if (!user?.email) return 'U';
    return user.email.charAt(0).toUpperCase();
  }, [user?.email]);

  const handleLogout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return {
    user,
    initials,
    handleLogout,
  };
};
