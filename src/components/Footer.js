import React, { Component } from "react";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <span>
            <strong>Readable</strong> by Jamal Taylor{" "}<br />
          </span>
          <strong>A project </strong>for the React Nanodegree @Udacity.{" "}
          <br />
          <a className="icon" href="https://github.com/Louis345">
            <i className="fa fa-github" />
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
