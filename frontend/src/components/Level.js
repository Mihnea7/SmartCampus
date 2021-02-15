import React from "react";
import DisplaySensor from "./DisplaySensor.js";
import { Collapse } from "react-collapse";
import Arrow from "./Arrow.js";
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
          <center>
            Level {this.props.sensors[0].level}
            <Arrow toggle={this.state.opened} /> <br /> Current People: {this.props.currentPeople}
          </center>
        </h2>
        <Collapse
          theme={{ content: "level-content", collapse: "level-collapse" }}
          isOpened={this.state.opened}
        >
          {this.state.sensors.map((sensor) => (
            <DisplaySensor
              id={sensor["_id"]}
              name={sensor["name"]}
              formal={sensor["formal"]}
              capacity={sensor["capacity"]}
              currentData={sensor["current"]}
              seriesData={sensor["history"]}
              url={this.props.url}
              handler={this.props.handler}
            />
          ))}
        </Collapse>
      </div>
    );
  }
}
