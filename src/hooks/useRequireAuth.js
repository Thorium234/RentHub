import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export function useRequireAuth(navigation) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.navigate('Auth');
    }
  }, [user]);

  return user;
}
