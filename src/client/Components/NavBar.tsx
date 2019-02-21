import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="nav-container">
        <div className="bw-gradient" />
        <Link className="link" to="/">
          <img src="" alt="" className="logo" />
        </Link>
        <div className="navbar">
          <div className="header">
            <nav>
              <ul>
                <li>
                  <a>
                    <Link to="/blogs" className="link">
                      Blogs
                    </Link>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
