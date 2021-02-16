import React from "react";
import DisplayBox from "./DisplayBox.js";
import GraphComponent from "./GraphComponent.js";
import Arrow from "./Arrow.js";
import { Collapse } from "react-collapse";
import "./DisplaySensor.css";

export default class Level extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      selected: false,
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggleCollapse() {
    this.setState((prevState) => ({
      opened: !prevState.opened,
    }));
  }

  handleSelect() {
    this.setState((prevState) => ({
      selected: !prevState.selected,
    }));
    this.props.handler(this.props.id);
  }

  render() {
    return (
      <div class="display-sensor">
        <div class="formal-name">
          <h3 class="sensorbox-collapsible-text" onClick={this.toggleCollapse}>
            <center>
              {this.props.formal}
              <Arrow toggle={this.state.opened} />
            </center>
          </h3>
        </div>
        <Collapse isOpened={this.state.opened}>
          <DisplayBox
            name={this.props.name}
            currentData={this.props.currentData}
            capacity={this.props.capacity}
          />
          <div class="graph-box">
            <GraphComponent
              seriesData={this.props.seriesData}
              yMaxVal={80}
              width={700}
              height={200}
            />
          </div>
        </Collapse>
        {!this.props.isOutsideSensor ? <button onClick={this.handleSelect}>
          {this.state.selected ? "Deselect" : "Select"}
        </button> : ""}
      </div>
    );
  }
}
