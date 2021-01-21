import Menu from "./Menu.js";
import BoydOrr from "./BoydOrr.js";
import Header from "./Header.js";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/boyd-orr" component={BoydOrr} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
