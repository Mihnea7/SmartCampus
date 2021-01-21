import React from "react";
import axios from "axios";
import DisplayBox from "./DisplayBox.js";
import GraphComponent from "./GraphComponent.js";
import "./DisplayBox.css";


export default class BoydOrr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/boyd-orr").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors };
      });
    });
  }

  render() {
    return (
      <div >
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
