import React, { Component } from "react";
import "./App.css";
import styled from "styled-components";

import PlayerInfoContainer from "./components/PlayerInfoContainer";
import Header from "./components/Header";
import Dungeon from "./components/Dungeon";

class App extends Component {
  render() {
    return (
      <Container className="App">
        <Header />
        <Dungeon />
        <PlayerInfoContainer />
      </Container>
    );
  }
}

export default App;


const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
max-width: 100vw;
min-height: 100vh;
overflow: hidden;
position: relative;
`;