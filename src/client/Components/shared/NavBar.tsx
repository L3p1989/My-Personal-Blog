import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  signOut() {
    localStorage.clear();
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  render() {
    return (
      <div className="nav-container">
        <div className="bw-gradient" />
        <Link className="link" to="/">
          <img
            src="https://cdn.discordapp.com/attachments/501423134335828000/545826863130345502/1080_namira.png"
            alt=""
            className="logo"
          />
        </Link>
        <div className="navbar">
          <div className="header">
            <nav>
              <ul>
                <li>
                  <Link to="/blogs" className="link">
                    Blogs
                  </Link>
                  <Link to="/register" className="link">
                    New User
                  </Link>
                  <Link to="/login" className="link">
                    Sign in
                  </Link>
                  <Link to="/" className="link" onClick={() => this.signOut()}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <h1 className="brand-quote">Slithr</h1>
        </div>
      </div>
    );
  }
}

export default NavBar;
