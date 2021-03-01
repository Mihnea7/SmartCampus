import BoydOrr from "./LevelBuildings/BoydOrr.js";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome.js";
import Library from "./LevelBuildings/Library.js";
import ParkingSpaceContainer from "../containers/ParkingSpacesContainer.js";
import OutsideSensorsContainer from "../containers/OutsideSensorsContainer.js"
import SingleSensorPageContainer from "../containers/SingleSensorPageContainer.js";
import ComparatorContainer from "../containers/ComparatorContainer.js";
import Header from "./Header/Header.js";

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
        <Route path="/compare" component={ComparatorContainer} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
