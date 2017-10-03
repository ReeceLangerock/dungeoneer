import React from "react";
import styled from "styled-components";
import HealthDisplay from "./HealthDisplay";
import ExpBar from "./ExpBar";
import InfoDisplay from "./InfoDisplay";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:flex-end;
  padding: 5px;
  border-top: 3px solid;
  height: 150px;
  margin-top: 20px;
`;

// const I = styled.i``;

export class PlayerInfoContainer extends React.Component {
  render() {
    return (
      <Container>
        <HealthDisplay currentHealth={50} maxHealth={100} />
        <ExpBar currentExp={30} neededExp={100}/>
        <InfoDisplay />
      </Container>
    );
  }
}
export default PlayerInfoContainer;
