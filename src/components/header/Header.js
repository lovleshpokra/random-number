import React from 'react';
import logo from './../../assets/images/icons/logo.png';

function Header () {
  return (
    <header className="app-header">
      <div className="logo">
        <img src={logo} alt="deepintent" />
      </div>
    </header>
  );
}

export default Header;
