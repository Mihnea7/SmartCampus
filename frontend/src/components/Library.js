import React from "react";
import axios from "axios";
import Level from "./Level";
import LevelBuilding from "./LevelBuilding";
import flash from "../image/flash.png";

export default class Library extends LevelBuilding {
  componentDidMount() {
    this.setState({
      url: "library",
      collection: "Library",
    });
    axios.get("http://mihnea17.pythonanywhere.com/library").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors };
      });
    });
  }

  render() {
    const levelMap = this.createLevelMap();
    const power = this.calculatePowerConsumption();
    return (
      <div>
        <h2><center>The Library</center></h2>
        <center>
          <div style={{backgroundColor:"whitesmoke", width: 300, border: "2px solid" }}>
            <img
              src={flash}
              style={{ height: 25, width: "auto" }}
              alt="Power"
            />{" "}
            {`${power} kWh`}
          </div>
        </center>
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
