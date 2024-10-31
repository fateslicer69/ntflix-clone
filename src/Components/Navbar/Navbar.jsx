import React, { useRef, useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navref = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navref.current.classList.add('nav-dark');
      } else {
        navref.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div ref={navref} className='Navbar'>
      <div className="Navbar-left">
        <img src={logo} alt='logo' />
        <ul>
          <li>Home</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse By Language</li>
        </ul>
      </div>
      <div className="Navbar-right">
        <img src={search_icon} alt='search' className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt='bellIcon' className='icons' />
        <div className="Navbar-profile">
          <img src={profile_img} alt='profile icon' className='profile' />
          <img 
            src={caret_icon} 
            alt='caret' 
            className='icons' 
            onClick={toggleDropdown} 
          />
          {showDropdown && (
            <div className="dropdown">
              <p onClick={() => { logout(); setShowDropdown(false); }}>Sign out of Netflix</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
