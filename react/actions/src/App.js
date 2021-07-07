import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Actions from "./components/Actions";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/actions" component={Actions} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
