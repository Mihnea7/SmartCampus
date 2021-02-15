import React from "react";

export default class LevelBuilding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensors: [],
      url: "",
      collection: "",
      selected: [],
    };

    this.selectSensor = this.selectSensor.bind(this);
    this.handleCompare = this.handleCompare.bind(this);
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
       // selectedString = selectedString.concat("&" + "sensorid=" + id);
       selectedString = `${selectedString}&sensorid=${id}`
      });
      const constring = `compare?collection=${this.state.collection}${selectedString}`;
      window.open(constring);
    }
  }
}
