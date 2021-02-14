import React from "react";
import axios from "axios";
import Level from "./Level";

export default class BoydOrr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
      url: "boyd-orr",
      selected: [],
    };

    this.selectSensor = this.selectSensor.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/boyd-orr").then((res) => {
      const all_sensors = res.data;
      this.setState((state) => {
        return { sensors: all_sensors };
      });
    });
  }

  createLevelMap() {
    const levelMap = {};
    this.state.sensors.forEach((element) => {
      if (!levelMap.hasOwnProperty(element.level))
        levelMap[element.level] = { sensors: [], currentPeople: 0 };
      levelMap[element.level]["sensors"].push(element);
      if (element.type === "headcount")
        levelMap[element.level]["currentPeople"] += element.current.value;
    });

    return levelMap;
  }

  selectSensor(id) {
    if (!this.state.selected.includes(id)) {
      const joined = this.state.selected.concat(id);
      this.setState({
        selected: joined,
      });
    }
    else {
      const i = this.state.selected.indexOf(id);
      const deleted = this.state.selected.splice(i, 1);
      this.setState({
        selected: deleted,
      });
    } 

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
      </div>
    );
  }
}
