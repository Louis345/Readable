import React, { Component } from "react";
import styles from "bulma/css/bulma.css";
const Navbar = ({}) => {
  return (
    <div className="readable-header">
      <div className="container">
        <div className="navbar-brand">

          <a className="navbar-item" href="/">
            <span>Readable</span>
            <img
              src="/static/media/readable-logo.b2718f49.png"
              width="112"
              height="26"
            />
          </a>
          <div className="navbar-end">
            <a className="navbar-item" href="https://github.com/Louis345">
              <i className="fa fa-github " />
            </a>
            <a
              className="navbar-item"
              href="https://www.freecodecamp.org/louis345"
            >
              <i className="fa fa-free-code-camp" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
