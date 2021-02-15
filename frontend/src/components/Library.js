import React from "react";
import axios from "axios";
import Level from "./Level";

export default class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
      url: "library",
      collection: "Library",
      selected: [],
    };
    this.selectSensor = this.selectSensor.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:5000/library").then((res) => {
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
    } else {
      const i = this.state.selected.indexOf(id);
      const deleted = this.state.selected.splice(i, 1);
      this.setState({
        selected: deleted,
      });
    }
  }
  handleCompare() {
    console.log(this.state.selected);
    if (this.state.selected.length > 1) {
      let selectedString = "";
      const idList = this.state.selected;
      idList.forEach((id) => {
        selectedString = selectedString.concat("&" + "sensorid=" + id);
      });
      const constring = `compare?collection=${this.state.collection}${selectedString}`;
      window.open(constring);
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
