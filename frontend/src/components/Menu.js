import React from "react";
import Sidebar from "react-sidebar";
import styles from "./Menu.css";
import { Link } from "react-router-dom";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: true,
    };
    this.onSetMenuOpen = this.onSetMenuOpen.bind(this);
  }

  onSetMenuOpen(open) {
    this.setState({
      menuOpen: open,
    });
  }

  render() {
    return (
      <Sidebar
        styles={{ sidebar: { background: "white" } }}
        sidebar={
          <div>
            <b>Menu</b>
            <ul>
              <li>Library</li>
              <li><Link to="/boyd-orr">Boyd Orr</Link></li>
              <li>QMU</li>
              <li>GUU</li>
              <li>Parking</li>
              <li>Societies</li>
              <li className={styles.liAbout}>About</li>
            </ul>
          </div>
        }
        open={this.state.menuOpen}
        onSetOpen={this.onSetMenuOpen}
      >
        <button
          style={{ margin: 20, padding: 10 }}
          onClick={() => this.onSetMenuOpen(!this.state.open)}
        >
          Open menu
        </button>
      </Sidebar>
    );
  }
}
