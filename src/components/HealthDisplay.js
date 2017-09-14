import React from "react";
import styled from "styled-components";

const CurrentHealthContainer = styled.div`
  position: absolute;
  top: 0px;
  width: ${props => props.healthPercentage}%;
  z-index: -3;
  background-color: green;
  height: 100%;
`;

const MaxHealthContainer = styled.div`
  font-size: 1rem;

  padding: 2px 0px 2px 0px;
  position: relative;
  overflow: hidden;

  width: 90%;
  border: 1px solid;
  border-radius: 10px;
  margin: 0 auto;
`;

export class HealthDisplay extends React.Component {
  render() {
    const healthPercentage = this.props.currentHealth / this.props.maxHealth * 100;
    return (
      <div>
        <MaxHealthContainer>
          {this.props.currentHealth} / {this.props.maxHealth}
          <CurrentHealthContainer healthPercentage={healthPercentage} />
        </MaxHealthContainer>
      </div>
    );
  }
}
export default HealthDisplay;
