import React from "react";
import GraphContainer from "../../containers/GraphContainer.js";

export default class Comparator extends React.Component {
  render() {
    return (
      <div>
        {this.props.sensor.map((sensor) => {
          return (
            <center>
              <h3>{sensor.formal}</h3>
              <GraphContainer
                seriesData={sensor.history}
                width={1000}
                height={300}
                yMaxVal={80}
              />
            </center>
          );
        })}
      </div>
    );
  }
}
