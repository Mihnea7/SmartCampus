import React from "react";
import Menu from "./Menu.js";
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <h1 style={{ textAlign: "center" }}> Smart Campus Dashboard</h1>
      </div>
    );
  }
}
