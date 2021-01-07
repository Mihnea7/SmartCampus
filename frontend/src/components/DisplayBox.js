import React from "react";
import "./DisplayBox.css";

// properties: name of the displayed item, measurements data (list of objects)
export default class DisplayBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div class="displaybox"> 
                <h3>{this.props.name}</h3> <hr />
                <h4>Current value </h4>
                {Object.keys(this.props.currentData).map(key => {
                    return `${key}: ${this.props.currentData[key]}\n`;
                }
                )}
            </div>
        )
    }
}