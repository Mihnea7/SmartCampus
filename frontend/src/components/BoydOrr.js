import React from "react";
import axios from "axios";
import Level from "./Level";
import LevelBuilding from "./LevelBuilding.js";

export default class BoydOrr extends LevelBuilding {
  componentDidMount() {
    this.setState({
      url: "boyd-orr",
      collection: "BoydOrr",
    });
    axios.get("http://127.0.0.1:5000/boyd-orr").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors };
      });
    });
  }

  render() {
    const levelMap = this.createLevelMap();

    return (
      <div>
        {Object.keys(levelMap).map((level) => {
          return (
            <Level
              sensors={levelMap[level]["sensors"]}
              currentPeople={levelMap[level]["currentPeople"]}
              url={this.state.url}
              handler={this.selectSensor}
            />
          );
        })}
        <center>
          <button
            style={{ height: 60, marginTop: 70 }}
            onClick={this.handleCompare}
          >
            See Comparison
          </button>
        </center>
      </div>
    );
  }
}
