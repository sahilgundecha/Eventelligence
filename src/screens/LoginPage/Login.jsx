// src/screens/Login.jsx
import React from 'react';
import Logo from '../../assets/images/logo.png';
import LoginBG from '../../assets/images/login.svg';
import {
  Checkbox,
  TextField,
  Button,
  Typography,
  Link,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Left section with form */}

      <div className='w-2/5 bg-[#F3F3F3] flex flex-col justify-center text-left px-16 items-center'>
        <div className='max-width'>
          <div className='flex items-center mb-4'>
            <img src={Logo} alt='EventNest Logo' className='w-auto h-auto' />
          </div>

          <h3 className='text-xl font-bold mb-2'>Welcome to EventNest!</h3>
          <p className='mb-6 text-[#7b746a]'>
            Please enter your Login ID & password to continue
          </p>

          {/* Login Form */}
          <div className='flex flex-col mb-2 gap-2'>
            <label htmlFor='loginId' className='block text-gray-700'>
              Login ID
            </label>
            <input
              autoFocus
              type='text'
              id='loginId'
              placeholder='Login ID'
              className='border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E]'
            />

            <label htmlFor='password' className='block text-gray-700'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              className='border rounded-md px-3 py-2 focus:outline-none focus:border-[#FF5B2E]'
            />
          </div>

          {/* Remember me and Reset Password */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='mr-2 border rounded-md checked:bg-[#FF5B2E] checked:border-[#FF5B2E]'
              />
              <label className='font-[#000000] text-sm font-semibold'>
                Remember me
              </label>
            </div>
            <a href='#' className='text-[#FF5B2E] text-sm font-bold'>
              Reset password
            </a>
          </div>

          {/* Login Button */}
          <button
            className='bg-[#201502] text-white px-4 py-2 rounded-md w-full'
            type='submit'
            onClick={() => navigate('/dashboard')}
          >
            Login
          </button>
        </div>
      </div>
      {/* Right section with image */}
      <div className='w-3/5'>
        <img src={LoginBG} alt='Event' className='w-full object-cover h-auto' />
      </div>
    </div>
  );
};

export default Login;
