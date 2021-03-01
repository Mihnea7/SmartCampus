import React from "react";

export default class Welcome extends React.Component {
  render() {
    return (
        <div style={{width:"100%"}}>
          <center>
      <h4>Welcome to UoG Smart Campus Dashboard!</h4>
      <p> To navigate the site, select the locations you would like to see from the Menu on the 
          left.
      </p>
      <p>Sensors will show the current data and a graph of past measurements. The graph can be zoomed, panned, viewed
        fullscreen and its height can be modified with the maginfying glass icons. 
      </p>
      <p>Headcount also sensors display the percentage of occupancy, based on the room's capacity and current people in it.</p>
      <p>Sensors can be selected for comparison. To select a sensor, click the Select button.
        At least 2 sensors should be selected. Then navigate to the end of the page, and click the See Comparison button.
      </p>
      <p>Sensors not located inside a building can be accessed through Outside Sensors in the Menu. This will show a
        map of the campus, where the sensors will be visible. They can be clicked for extra information.
      </p>
      </center>
      </div>
    );
  }
}