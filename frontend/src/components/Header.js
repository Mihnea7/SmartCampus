import React from "react";
import Menu from "./Menu.js";
import logo from "../image/uni-logo.png";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <div class="header-div">
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
          <img src={logo} alt="Logo" class="logo-image" />
          <h1 class="header-text">Smart Campus Dashboard</h1>
        </Link>
        <Menu />
      </div>
    );
  }
}
