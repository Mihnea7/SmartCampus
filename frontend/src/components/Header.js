import React from "react";
import Menu from "./Menu.js";
import logo from "../image/uni-logo.png";
import "./Header.css";

export default class Header extends React.Component {
  render() {
    return (
      <div class="header-div">
        <img
            src={logo}
            alt="Logo"
            class="logo-image"
          />
        <Menu />
          <h1 class="header-text"> Smart Campus Dashboard</h1>
          
      </div>
    );
  }
}
