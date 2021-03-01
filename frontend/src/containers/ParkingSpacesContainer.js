import React from "react";
import axios from "axios";
import ParkingSpaces from "../components/ParkingSpaces.js";

export default class ParkingSpacesContainer extends React.Component {
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
    axios.get("http://127.0.0.1:5000/parking-spaces").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors };
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
          color: "blue",
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
    window.open("/sensor?collection=ParkingSpaces&sensorid=" + sensorName);
  }

  render() {
    return <ParkingSpaces pins={this.createPins()} />;
  }
}
