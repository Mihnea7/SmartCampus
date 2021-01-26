import BoydOrr from "./BoydOrr.js";
import Header from "./Header.js";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome.js";

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/boyd-orr" component={BoydOrr} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
