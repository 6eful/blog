import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header () {
  return(
    <header id="main-header">
      <div className="header-content">
        <Link to="/">Blog do Programador</Link>
        <Link to="/login">Entrar</Link>
      </div>
    </header>
  );
}

export default Header;
