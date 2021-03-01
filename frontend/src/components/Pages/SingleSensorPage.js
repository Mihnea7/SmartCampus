import React from "react";
import DisplaySensor from "../DisplaySensor/DisplaySensor.js";
export default class SingleSensorPage extends React.Component {
  
  render() {

    return (
        <div>
        {this.props.sensor.map((sensor) => (
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
