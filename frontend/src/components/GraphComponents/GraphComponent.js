import React from "react";
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from "react-timeseries-charts";

export default class GraphComponent extends React.Component {
  render() {
    const avg = this.props.timeseries.avg("value").toFixed(2);
    const max = this.props.timeseries.max("value").toFixed(2);
    const min = this.props.timeseries.min("value").toFixed(2);

    return (
      <div>
        <center>
          Average value: {avg} <br />
          Historic maximum: {max} <br />
          Historic minimum: {min}
        </center>
        <ChartContainer
          class="displayGraph"
          timeRange={this.props.timerange}
          width={this.props.width}
          showGrid={true}
          showGridPosition="under"
          trackerPosition={this.props.tracker}
          onTrackerChanged={this.props.handleTrackerChanged}
          enablePanZoom={true}
          onTimeRangeChanged={this.props.handleTimeRangeChange}
        >
          <ChartRow
            height={this.props.height}
            trackerInfoValues={this.props.trackerInfoValues}
            trackerInfoHeight={50}
          >
            <YAxis
              id="axis1"
              label="Value"
              showGrid={true}
              min={max > 100000 ? min : 0}
              max={this.props.yMaxVal}
              width="100"
            />
            <Charts>
              <LineChart
                axis="axis1"
                series={this.props.timeseries}
                column={["value"]}
                interpolation="curveBasis"
              />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </div>
    );
  }
}
