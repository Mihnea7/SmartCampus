import React from "react";
import axios from "axios";
import SingleSensorPage from "../components/SingleSensorPage";

export default class SingleSensorPageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: [],
    };
  }
  componentDidMount() {
    let qParams = this.props.location.search;
    console.log(qParams);
    axios.get("http://127.0.0.1:5000/sensor" + qParams).then((res) => {
      const all_sensor = res.data;
      console.log(all_sensor);
      this.setState((state) => {
        return { sensor: [all_sensor] };
      });
    });
  }
  render() {
      return <SingleSensorPage sensor={this.state.sensor}/>
  }
}
