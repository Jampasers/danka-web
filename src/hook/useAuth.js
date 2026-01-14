import { useSession, signIn, signOut } from 'next-auth/react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  
  return {
    user: session?.user,
    token: session?.accessToken,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login: signIn,
    logout: signOut,
    status
  };
};