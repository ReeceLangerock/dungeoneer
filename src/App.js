import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import PlayerInfoContainer from "./components/PlayerInfoContainer";
import Header from "./components/Header";
import Dungeon from "./components/Dungeon";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dungeon />
        <PlayerInfoContainer />
      </div>
    );
  }
}

export default App;
