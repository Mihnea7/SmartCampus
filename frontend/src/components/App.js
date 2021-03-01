import BoydOrr from "./BoydOrr.js";
import Header from "./Header.js";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome.js";
import Library from "./Library.js";
import Comparator from "./Comparator.js";
import ParkingSpaceContainer from "../containers/ParkingSpacesContainer.js";
import OutsideSensorsContainer from "../containers/OutsideSensorsContainer.js"
import SingleSensorPageContainer from "../containers/SingleSensorPageContainer.js";

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/boyd-orr" component={BoydOrr} />
        <Route path="/library" component={Library} />
        <Route path="/outside-sensors" component={OutsideSensorsContainer} exact/>
        <Route path="/parking-spaces" component={ParkingSpaceContainer} />
        <Route path="/sensor" component={SingleSensorPageContainer}/>
        <Route path="/compare" component={Comparator} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
