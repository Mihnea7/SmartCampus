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

    this.state = {
      timerange: new TimeRange([1599820503, 1606757703]),
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
      timerange:timeseries.timerange()
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

  sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    } else {
      return a[0] < b[0] ? -1 : 1;
    }
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
    const {timerange} = this.state;
    return (
        <ChartContainer
          timeRange={timerange}
          width={700}
          enablePanZoom={true}
          onTimeRangeChanged={this.handleTimeRangeChange}
        >
          <ChartRow height="200">
            <YAxis id="axis1" label="Value" min={0.0} max={80} width="100" />
            <Charts>
              <LineChart axis="axis1" series={timeseries} column={["value"]} interpolation="curveBasis"/>
            </Charts>
          </ChartRow>
        </ChartContainer>
    );
  }
}
