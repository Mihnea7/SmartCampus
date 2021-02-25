import React from "react";
import axios from "axios";
import DisplaySensor from "./DisplaySensor.js";
export default class SingleSensorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: [],
    };
  }
  componentDidMount() {
    let qParams = this.props.location.search;
    console.log(qParams);
    axios.get("https://mihnea17.pythonanywhere.com/sensor" + qParams).then((res) => {
      const all_sensor = res.data;
      console.log(all_sensor);
      this.setState((state) => {
        return { sensor: [all_sensor] };
      });
    });
  }
  render() {

    return (
        <div>
        {this.state.sensor.map((sensor) => (
            <DisplaySensor
              name={sensor["name"]}
              formal={sensor["formalName"]}
              currentData={sensor["current"]}
              seriesData={sensor["history"]}
              isOutsideSensor={true}
            />
          ))}
          </div>
    )
  }
}
