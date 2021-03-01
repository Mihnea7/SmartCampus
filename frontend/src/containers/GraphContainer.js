import React from "react";
import GraphZoom from "../components/GraphComponents/GraphZoom.js";
import FullscreenGraph from "../components/GraphComponents/FullscreenGraph.js";
import { TimeSeries, TimeRange } from "pondjs";
import GraphComponent from "../components/GraphComponents/GraphComponent.js";

export default class GraphContainer extends React.Component {
  constructor(props) {
    super(props);

    this.getTimeValue = this.getTimeValue.bind(this);
    this.generateTimeSeries = this.generateTimeSeries.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
    this.handleTrackerChanged = this.handleTrackerChanged.bind(this);
    this.addZoom = this.addZoom.bind(this);

    this.state = {
      timerange: new TimeRange([0, 1]),
      tracker: 0,
      yMaxVal: this.props.yMaxVal,
      width: this.props.width,
      height: this.props.height,
    };
  }
  componentDidMount() {
    const ts = this.generateTimeSeries(this.props.seriesData);
    this.setState({ yMaxVal: ts.max(), timerange: ts.timerange() });
  }
  getTimeValue(obj) {
    return [Date.parse(obj["time"]), obj["value"]];
  }

  sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    } else {
      return a[0] < b[0] ? -1 : 1;
    }
  }

  generateTimeSeries(objectArray) {
    let timeSeriesList = [];
    objectArray.forEach((index) => {
      timeSeriesList.push(this.getTimeValue(index));
    });
    timeSeriesList.sort(this.sortFunction);
    const timeSeriesData = {
      name: "chart",
      columns: ["time", "value"],
      points: timeSeriesList,
    };
    const timeseries = new TimeSeries(timeSeriesData);
    return timeseries;
  }

  handleTimeRangeChange = (timerange) => {
    this.setState({ timerange });
  };

  handleTrackerChanged(t) {
    this.setState({ tracker: t });
  }

  addZoom(amount) {
    this.setState((prevState) => {
      return {
        yMaxVal: prevState.yMaxVal + amount,
      };
    });
  }
  render() {
    let ts = this.generateTimeSeries(this.props.seriesData);

    const { timerange } = this.state;
    const ev = ts.atTime(new Date(this.state.tracker));
    const trackerInfoValues = [
      { label: "value", value: ev.data().get("value") },
    ];

    return (
      <div>
        <GraphComponent
          timeseries={ts}
          timerange={timerange}
          tracker={this.state.tracker}
          trackerInfoValues={trackerInfoValues}
          yMaxVal={this.state.yMaxVal}
          width={this.props.width}
          height={this.props.height}
          handleTimeRangeChange={this.handleTimeRangeChange}
          handleTrackerChanged={this.handleTrackerChanged}
        />
        <div>
          <center>
            <FullscreenGraph
              seriesData={this.props.seriesData}
              yMaxVal={this.state.yMaxVal}
              width={1500}
              height={500}
            />
            <GraphZoom onClick={this.addZoom} />
          </center>
        </div>
      </div>
    );
  }
}
