import axios from 'axios';

const useAuth = () => {
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          email,
          password,
        }
      );
      console.log(response);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const signUp = async () => {};

  return {
    signIn,
    signUp,
  };
};

export default useAuth;
