'use client';

import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

export interface Users {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const userInfo: Users = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  password: '',
};

export default function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderContentIfSignin = (
    signinContent: string,
    signupContent: string
  ) => {
    return isSignin ? signinContent : signupContent;
  };

  const { loading, error, data } = useContext(AuthenticationContext);
  const [user, setUser] = useState(userInfo);
  const [disabled, setDisabled] = useState(true);
  const { signIn, signUp } = useAuth();

  useEffect(() => {
    if (isSignin) {
      if (user.email && user.password) {
        return setDisabled(false);
      }
      setDisabled(true);
    } else {
      if (
        user.firstName &&
        user.lastName &&
        user.email &&
        user.phone &&
        user.city &&
        user.password
      ) {
        return setDisabled(false);
      }
    }
  }, [user]);

  const handleChangesInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (isSignin) {
      signIn({ email: user.email, password: user.password }, handleClose);
    } else {
      signUp(user, handleClose);
    }
  };

  return (
    <div>
      <button
        className={`${renderContentIfSignin(
          'bg-blue-400 text-white',
          ''
        )} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderContentIfSignin('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded">
          {loading ? (
            <div className="py-24 p-2 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              <div className="uppercased font-bold text-center pb-2 border-b mb-2">
                <p className="text-xl">
                  {renderContentIfSignin('Sign in', 'Create Account')}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderContentIfSignin(
                    'Log Into Your Account',
                    'Create Your OpenTable Account'
                  )}
                </h2>
                <AuthModalInput
                  user={user}
                  handleChangesInput={handleChangesInput}
                  isSignin={isSignin}
                />
                {error ? (
                  <Alert severity="error" className="mb-4">
                    {error}
                  </Alert>
                ) : null}
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderContentIfSignin('Sign in', 'Create Account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
