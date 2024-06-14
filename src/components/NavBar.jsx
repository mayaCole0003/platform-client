import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

const NavBar = () => {
  return (
    <nav>
      <div className="bothHeaders">
        <div className="headerContainer">
          <NavLink to="/">
            Maya's Super Awesome Blog
          </NavLink>
        </div>
        <div className="newPost">
          <NavLink to="/posts/new">New Post</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;