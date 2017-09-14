import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import HealthDisplay from "./components/HealthDisplay";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <HealthDisplay currentHealth={80} maxHealth={100} />
      </div>
    );
  }
}

export default App;
