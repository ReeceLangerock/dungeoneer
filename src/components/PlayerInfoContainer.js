import React from "react";
import styled from "styled-components";
import HealthDisplay from "./HealthDisplay";
import ExpBar from "./ExpBar";
import InfoDisplay from "./InfoDisplay";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
  padding: 5px 10px;
  height: 150px;
  font-family: 'OptimusPrinceps';
    
  z-index: 5;
  // background: white;
  background: #191919;
  
`;

// const I = styled.i``;

export class PlayerInfoContainer extends React.Component {
  render() {
    return (
      <Container>
        <HealthDisplay/>
        <ExpBar/>
        <InfoDisplay />
      </Container>
    );
  }
}
export default PlayerInfoContainer;
