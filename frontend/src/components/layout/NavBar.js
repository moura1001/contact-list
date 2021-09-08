import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import { connect } from 'react-redux';

const NavBar = (props) => {
  const { signedIn } = props;
  const links = signedIn ? <SignedInLinks /> : null;
  return (
    <nav className="nav-wrapper green darken-3">
      <div className="container">
        <Link to='/contacts' className="brand-logo center">Contact List</Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return{
    signedIn: state.auth.signedIn
  }
}

export default connect(mapStateToProps)(NavBar)