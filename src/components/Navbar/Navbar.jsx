import React from 'react';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className='bg-white py-4 border-b border-[#D9D9D9] w-full sticky top-0 z-50'>
      <div className='flex justify-between items-center w-11/12 mx-auto'>
        <img
          src={Logo}
          alt='logo'
          onClick={() => navigate('/dashboard')}
          className='cursor-pointer'
        />
      </div>
    </nav>
  );
};

export default Navbar;
