import React from "react";
import DisplayBox from "./DisplayBox.js";
import GraphComponent from "./GraphComponent.js";
import Arrow from "./Arrow.js"
import { Collapse } from "react-collapse";
import "./DisplaySensor.css";

export default class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <div class="display-sensor">
        <div class="formal-name">
          <h3 class="sensorbox-collapsible-text" onClick={this.toggleCollapse}>
            <center>{this.props.formal}<Arrow toggle={this.state.opened} /></center>
          </h3>
        </div>
        <Collapse isOpened={this.state.opened}>
          <DisplayBox
            name={this.props.name}
            currentData={this.props.currentData}
          />
          <div class="graph-box">
            <GraphComponent seriesData={this.props.seriesData} />
          </div>
        </Collapse>
      </div>
    );
  }
}