import React from "react";
import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import "./Menu.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
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
      <div>
        <Sidebar
          styles={{
            root: { width: 200 },
            sidebar: { background: "white" },
            overlay: { visibility: "hidden" },
          }}
          sidebar={
            <div>
              <b>Menu</b>
              <ul>
                <li>
                  <Link to="/library">Library</Link>
                </li>
                <li>
                  <Link to="/boyd-orr">Boyd Orr</Link>
                </li>
                <li>
                  <Link to="/outside-sensors">Outside Sensors</Link>
                </li>
                <li>
                  <Link to="/parking-spaces">Parking</Link>
                </li>
                <li>QMU</li>
                <li>GUU</li>
                <li>Societies</li>
                <li>About</li>
              </ul>
            </div>
          }
          open={this.state.menuOpen}
          onSetOpen={this.onSetMenuOpen}
        >
          <div class="menubutton">
            <button
              class="menubutton-text"
              onClick={() => this.onSetMenuOpen(!this.state.open)}
            >
              Open menu
            </button>
          </div>
        </Sidebar>
      </div>
    );
  }
}
