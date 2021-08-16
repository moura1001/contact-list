import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <nav className="nav-wrapper green darken-3">
      <div className="container">
        <Link className="center brand-logo" to="/contacts">{props.title}</Link>
      </div>
    </nav>
  )
}

export default NavBar