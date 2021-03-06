import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';
import { logout } from '../../redux/auth/action';

const Navbar = ({ auth: { isAuth }, logout, notifications }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <a href="/profiles"> Developers</a>
      </li>
      <li>
        <Link to="/register"> Register</Link>
      </li>
      <li>
        <Link to="/login"> Login</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <Notifications notifications={notifications} />
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code" />
            DevConnector
          </Link>
        </h1>
        <Fragment>{isAuth ? authLinks : guestLinks}</Fragment>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
};

export default connect(
  state => ({
    auth: state.auth,
    notifications: state.notifications,
  }),
  { logout },
)(Navbar);
