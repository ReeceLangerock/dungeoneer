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
  z-index: 5;
  background: white;
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
