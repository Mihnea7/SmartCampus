import React from "react";
import Popup from "reactjs-popup";
import GraphContainer from "../../containers/GraphContainer";
import fullscreen from "../../image/fullscreen.svg";
import "./GraphControl.css"

export default class FullscreenGraph extends React.Component {
  render() {
    return (
      <div class="fullscreen-icon">
      <Popup
        trigger={
          <img
            src={fullscreen}
            alt="Fullscreen"
            ref={(elm) => {
              this.image = elm;
            }}
          />
        }
        position="right center"
        closeOnDocumentClick
        modal
        nested
      >
          <div class="popup-box">
        <GraphContainer
          seriesData={this.props.seriesData}
          yMaxVal={this.props.yMaxVal}
          height={this.props.height}
        />
        </div>
      </Popup>
      </div>
    );
  }
}
