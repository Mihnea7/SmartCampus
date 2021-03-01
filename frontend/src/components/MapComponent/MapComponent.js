import React from "react";
import { ReactBingmaps } from "react-bingmaps";
import { config } from "../config.js";
import "./MapComponent.css";

export default class MapComponent extends React.Component {
  render() {
    return (
      <div>
        <div class="map-container">
          {this.props.pins.length === 0 ? (
            false
          ) : (
            <ReactBingmaps
              bingmapKey={config.MAP_API_KEY}
              center={[55.872422, -4.28857]}
              navigationBarMode={"compact"}
              zoom={17}
              infoboxesWithPushPins={this.props.pins}
            />
          )}
        </div>
      </div>
    );
  }
}
