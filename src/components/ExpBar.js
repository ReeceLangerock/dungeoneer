import React from "react";
import styled from "styled-components";

const CurrentHealthContainer = styled.div`
  position: absolute;
  top: 0px;
  width: ${props => props.healthPercentage}%;
  z-index: -3;
  background-color: yellow;
  height: 100%;
`;

const MaxHealthContainer = styled.div`
  font-size: 1rem;

  padding: 2px 0px 2px 0px;
  position: relative;
  overflow: hidden;
  height: 25px;
  width: 100%;
  border: 1px solid;
  border-radius: 10px;
  margin: 0px 5px 0px 5px;
  line-height: 25px;
  
`;

export class ExpBar extends React.Component {
  render() {
    const expPercentage = this.props.currentExp / this.props.neededExp * 100;
    return (
      <MaxHealthContainer>
        {this.props.currentExp} / {this.props.neededExp}
        <CurrentHealthContainer healthPercentage={expPercentage} />
      </MaxHealthContainer>
    );
  }
}
export default ExpBar;
