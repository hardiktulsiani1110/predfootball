/* eslint-disable prettier/prettier */
import axios from 'axios';
import {BACKEND_URL} from '@env';

export const login = async (email, password) => {
  return await axios.post(
    `${BACKEND_URL}/login/`,
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const register = async (email, password) => {
  return await axios.post(
    `${BACKEND_URL}/register/`,
    {
      email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
