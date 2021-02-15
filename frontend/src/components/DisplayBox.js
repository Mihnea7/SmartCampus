import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./DisplayBox.css";
import "react-circular-progressbar/dist/styles.css";

// properties: name of the displayed item, measurements data (list of objects)
export default class DisplayBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const percentage = (
      this.props.currentData.value * 100 / this.props.capacity
    ).toFixed(2);
    return (
      <div class="displaybox">
        <h3>{this.props.name}</h3> <hr />
        <h4>Current value </h4>
        {Object.keys(this.props.currentData).map((key) => {
          return `${key}: ${this.props.currentData[key]}\n`;
        })}
        <div style={{ width: 120, marginTop: 20 }}>
          {this.props.capacity ? (
            <CircularProgressbar
              styles={buildStyles({ textSize: "20px" })}
              value={percentage}
              text={`${percentage}%`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
