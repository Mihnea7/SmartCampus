import React from "react";
import axios from "axios";
import { ReactBingmaps } from "react-bingmaps";
import { config } from "./config.js";
import "./OutsideSensors.css";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
      pins: [],
    };

    this.createPins = this.createPins.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/outside-sensors").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors };
      });
    });
  }

  createPins() {
    const pinsArray = [];
    this.state.sensors.forEach(sensor =>  {
      const pinSensor = {
        location: [sensor["lat"], sensor["long"]],
        option: {
          color: "red",
        },
      };
      pinsArray.push(pinSensor);
    });
    console.log(pinsArray);
    return pinsArray;
  }

  render() {
    return (
      <div class="map-container">
        {this.createPins().length === 0 ? false: <ReactBingmaps
          bingmapKey={config.MAP_API_KEY}
          center={[55.872422, -4.28857]}
          navigationBarMode={"compact"}
          zoom={17}
          pushPins={this.createPins()}
        />}
        
      </div>
    );
  }
}
