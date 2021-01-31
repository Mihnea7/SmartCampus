import React from "react";
import DisplayBox from "./DisplayBox.js";
import GraphComponent from "./GraphComponent.js";
import { Collapse } from "react-collapse";
import "./DisplayBox.css";
import "./Level.css";

export default class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: this.props.sensors,
      opened: false,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse() {
    this.setState((prevState) => ({
      opened: !prevState.opened,
    }));
  }

  render() {
    return (
      <div class="level">
        <h2 class="collapsible-text" onClick={this.toggleCollapse}>
          <center>Level {this.props.sensors[0].level}</center>
        </h2>
        <hr />
        <Collapse isOpened={this.state.opened}>
          {this.state.sensors.map((sensor) => (
            <div class="display-sensor">
              <DisplayBox
                name={sensor["name"]}
                currentData={sensor["current"]}
              />
              <GraphComponent seriesData={sensor["history"]} />
            </div>
          ))}
        </Collapse>
      </div>
    );
  }
}
