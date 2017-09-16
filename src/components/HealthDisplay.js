import React from "react";
import styled from "styled-components";

const CurrentHealthContainer = styled.div`
  position: absolute;
  bottom: 0px;
  height: ${props => props.healthPercentage}%;
  z-index: -3;
  background-color: red;
  width: 100%;
`;

const MaxHealthContainer = styled.div`
  font-size: 1.1rem;

  position: relative;
  overflow: hidden;
  height: 125px;
  width: 125px;
  line-height: 125px;
  font-weight: bold;
  border: 1px solid;
  border-radius: 50%;
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
