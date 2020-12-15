import React from "react";
import axios from 'axios';

export default class BoydOrr extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            sensors : []
        }
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:5000/boyd-orr")
      .then(res => {
        const all_sensors = res.data;
        console.log(all_sensors);
        this.setState({ sensors : all_sensors });
      })
      
    }


    render () {
        
        return (
            <div>
                Boyd Orr
                {this.state.sensors.map(sensor =>
                <div>
                    <h3>{sensor["name"]}</h3>
                    <ul>
                        <li>Level: {sensor["level"]}</li>
                        <li>Current: {sensor["current"]["value"]}</li>
                    </ul> 
                    <hr />
                </div>
                )}
            </div>
        )
    }
}