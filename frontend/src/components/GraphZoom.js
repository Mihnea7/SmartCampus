import React from "react";
import zoom from "../image/zoom.png"
import unzoom from "../image/unzoom.png"
import "./GraphControl.css"

export default class GraphZoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleZoom = this.handleZoom.bind(this);
      }

    handleZoom(am) {
        this.props.onClick(am);
    }

    render() {
        return (
            <div class="zoom-icons">
                <img src={zoom} alt="Zoom" onClick={() => this.handleZoom(5)} />
                <img src={unzoom} alt="Unzoom" onClick={() => this.handleZoom(-5)}/>
            </div>
        )
    }
}