import BoydOrr from "./BoydOrr.js";
import Header from "./Header.js";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome.js";
import Library from "./Library.js";
import OutsideSensors from "./OutsideSensors.js";
import SingleSensorPage from "./SingleSensorPage.js"
import Comparator from "./Comparator.js";
import ParkingSpaces from "./ParkingSpaces.js"
import TaskManager from "./TaskManager.js";
import { useState } from 'react';

function App() {
  const [clickCount, setCount] = useState(0);
  return (
    <main onMouseDownCapture={() => setCount(clickCount + 1)}>
      <Header />
      <TaskManager  clickCounter={clickCount} resetCount={() => setCount(0)} />
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/boyd-orr" component={BoydOrr} />
        <Route path="/library" component={Library} />
        <Route path="/outside-sensors" component={OutsideSensors} exact/>
        <Route path="/parking-spaces" component={ParkingSpaces} />
        <Route path="/sensor" component={SingleSensorPage}/>
        <Route path="/compare" component={Comparator} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
