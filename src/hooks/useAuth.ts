import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { getCookie, removeCookies } from 'cookies-next';
import { useContext } from 'react';

const useAuth = () => {
  const { loading, data, error, setAuthState } = useContext(
    AuthenticationContext
  );
  const signIn = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    try {
      setAuthState({ loading: true, data: null, error: null });
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          email,
          password,
        }
      );
      setAuthState({ loading: false, data: response.data, error: null });
      handleClose();
    } catch (error: any) {
      console.log(error.response.data.errorsMessage);
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorsMessage,
      });
    }
  };

  const signUp = async (
    {
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
      city: string;
    },
    handleClose: () => void
  ) => {
    try {
      setAuthState({ loading: true, data: null, error: null });
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          city,
        }
      );
      setAuthState({ loading: false, data: response.data, error: null });
      handleClose();
    } catch (error: any) {
      console.log(error.response.data.errorsMessage);
      setAuthState({
        loading: false,
        data: null,
        error: error.response.data.errorsMessage,
      });
    }
  };

  const signOut = async () => {
    removeCookies('jwt');
    setAuthState({ loading: false, data: null, error: null });
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
