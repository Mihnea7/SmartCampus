import React from "react";
import axios from "axios";
import Comparator from "../components/Pages/Comparator";

export default class ComparatorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: [],
    };
  }
  componentDidMount() {
    const qParams = this.props.location.search;
    const id_list = qParams.split("&");
    const collection = id_list.splice(0, 1).join("");
    id_list.forEach((id) => {
      console.log(id);
      axios
        .get("http://127.0.0.1:5000/sensor" + collection + "&" + id)
        .then((res) => {
          const all_sensor = res.data;
          const add_state = this.state.sensor;
          add_state.push(all_sensor);
          this.setState((state) => {
            return { sensor: add_state };
          });
        });
    });
  }
  render() {
      return <Comparator sensor={this.state.sensor}/>
  }
}
