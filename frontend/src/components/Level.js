import React from "react";
import DisplayBox from "./DisplayBox.js";
import GraphComponent from "./GraphComponent.js";
import "./DisplayBox.css";

export default class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: this.props.sensors,
    };
  }

  render() {
    return (
      <div class="level">
        <h2><center>Level {this.props.sensors[0].level}</center></h2><hr/>
        {this.state.sensors.map((sensor) => (
          <div class="displaySensor">
            <DisplayBox name={sensor["name"]} currentData={sensor["current"]} />
            <GraphComponent seriesData={sensor["history"]} />
          </div>
        ))}
      </div>
    );
  }
}
