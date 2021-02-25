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
      selectedSensor: "6020441c6105ef7c424d56ce",
    };

    this.createPins = this.createPins.bind(this);
    this.handleSelectSensor = this.handleSelectSensor.bind(this);
  }

  componentDidMount() {
    axios.get("https://mihnea17.pythonanywhere.com/outside-sensors").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors, sens: all_sensors[0] };
      });
    });
  }

  createPins() {
    const pinsArray = [];
    this.state.sensors.forEach((sensor) => {
      const pinSensor = {
        _id: sensor["_id"],
        addHandler: "mouseover",
        location: [sensor["lat"], sensor["long"]],
        infoboxOption: {
          title: sensor["formalName"],
          description: "Current value: " + sensor["current"]["value"],
        },
        pushPinOption: {
          title: sensor["formalName"],
          color: "red",
        },
        pushPinAddHandler: {
          type: "click",
          callback: () => this.handleSelectSensor(sensor["_id"]),
        },
      };
      pinsArray.push(pinSensor);
    });
    return pinsArray;
  }

  handleSelectSensor(sensorName) {
    this.setState({
      selectedSensor: sensorName,
    });
    window.open("/sensor?collection=OutsideSensors&sensorid=" + sensorName);
  }

  render() {
    console.log(this.state.sens);
    return (
      <div>
        <div class="map-container">
          {this.createPins().length === 0 ? (
            false
          ) : (
            <ReactBingmaps
              bingmapKey={config.MAP_API_KEY}
              center={[55.872422, -4.28857]}
              navigationBarMode={"compact"}
              zoom={17}
              infoboxesWithPushPins={this.createPins()}
            />
          )}
        </div>
      </div>
    );
  }
}
