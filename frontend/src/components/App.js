import Menu from "./Menu.js";
import BoydOrr from "./BoydOrr.js";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <main>
      <Menu />
      <Switch>
        <Route path="/boyd-orr" component={BoydOrr} exact/>
        <Route path="/" component={Menu} />
        <Route component={Error} />
        <div>
          <h1 style={{ textAlign: "center" }}> Smart Campus Dashboard</h1>
        </div>
      </Switch>
    </main>
  );
}

export default App;
