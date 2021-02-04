import React from "react";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";

export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props);

    this.getTimeValue = this.getTimeValue.bind(this);
    this.generateTimeSeries = this.generateTimeSeries.bind(this);
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this);
    this.handleTrackerChanged = this.handleTrackerChanged.bind(this);

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

  handleyMaxVal

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

  render() {
    let ts = this.generateTimeSeries(this.props.seriesData);
    ts.sort(this.sortFunction);
    const timeSeriesData = {
      name: "chart",
      columns: ["time", "value"],
      points: ts,
    };
    console.log(ts);
    const timeseries = new TimeSeries(timeSeriesData);
    const { timerange } = this.state;

    return (
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
          trackerInfoValues={[]}
          trackerInfoHeight={50}
        >
          <YAxis
            id="axis1"
            label="Value"
            showGrid={true}
            min={0.0}
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
    );
  }
}
