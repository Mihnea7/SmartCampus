import React from "react";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from "react-timeseries-charts";
import GraphZoom from "./GraphZoom.js";
import FullscreenGraph from "./FullscreenGraph.js"
import { TimeSeries, TimeRange } from "pondjs";

export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props);

    this.getTimeValue = this.getTimeValue.bind(this);
    this.generateTimeSeries = this.generateTimeSeries.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
    this.handleTrackerChanged = this.handleTrackerChanged.bind(this);
    this.addZoom = this.addZoom.bind(this);

    this.state = {
      timerange: new TimeRange([1599820503, 1606757703]),
      tracker: 0,
      yMaxVal: this.props.yMaxVal,
      width: this.props.width,
      height: this.props.height,
    };
  }

  componentDidMount() {
    let ts = this.generateTimeSeries(this.props.seriesData);
    ts.sort(this.sortFunction);
    const timeSeriesData = {
      name: "chart",
      columns: ["time", "value"],
      points: ts,
    };
    const timeseries = new TimeSeries(timeSeriesData);
    this.setState({
      timerange: timeseries.timerange(),
      yMaxVal: timeseries.max("value"),
    });
  }
  getTimeValue(obj) {
    return [Date.parse(obj["time"]), obj["value"]];
  }

  generateTimeSeries(objectArray) {
    let timeSeriesList = [];
    objectArray.forEach((index) => {
      timeSeriesList.push(this.getTimeValue(index));
    });

    return timeSeriesList;
  }

  handleTimeRangeChange = (timerange) => {
    this.setState({ timerange });
  };

  handleyMaxVal;

  sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    } else {
      return a[0] < b[0] ? -1 : 1;
    }
  }

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
    ts.sort(this.sortFunction);
    const timeSeriesData = {
      name: "chart",
      columns: ["time", "value"],
      points: ts,
    };
 

    const timeseries = new TimeSeries(timeSeriesData);
    const { timerange } = this.state;
    const ev = timeseries.atTime(new Date(this.state.tracker))
    const trackerInfoValues = [
      { label: "value", value: ev.data().get("value")}
    ]
    const avg = timeseries.avg("value");
    const max = timeseries.max("value")
    const min = timeseries.min("value")

    return (
      <div>
        <center>
        Average value: {avg} <br />
        Historic maximum: {max} <br />
        Historic minimum: {min}
        </center>
        <ChartContainer
          class="displayGraph"
          timeRange={timerange}
          width={this.props.width}
          showGrid={true}
          showGridPosition="under"
          trackerPosition={this.state.tracker}
          onTrackerChanged={this.handleTrackerChanged}
          enablePanZoom={true}
          onTimeRangeChanged={this.handleTimeRangeChange}
        >
          <ChartRow
            height={this.state.height}
            trackerInfoValues={trackerInfoValues}
            trackerInfoHeight={50}
          >
            <YAxis
              id="axis1"
              label="Value"
              showGrid={true}
              min={max > 100000? min:0}
              max={this.state.yMaxVal}
              width="100"
            />
            <Charts>
              <LineChart
                axis="axis1"
                series={timeseries}
                column={["value"]}
                interpolation="curveBasis"
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
        <center>
        <FullscreenGraph seriesData={this.props.seriesData} yMaxVal={this.state.yMaxVal} width={1500} height={500} />
        <GraphZoom onClick={this.addZoom} />
        </center>
      </div>
    );
  }
}
