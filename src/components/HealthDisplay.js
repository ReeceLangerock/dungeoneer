import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux'


const CurrentHealthContainer = styled.div`
  position: absolute;
  bottom: 0px;
  height: ${props => props.healthPercentage}%;
  z-index: 1;
  background-color: #7f1517;
  
  width: 110%;
`;

const MaxHealthContainer = styled.div`
  font-size: 1.1rem;

  position: relative;
  overflow: hidden;
  height: 150px;
  width: 150px;
  line-height: 150px;
  font-weight: bold;
  border: 2px solid #510E0F;
  border-radius: 50%;
  margin: 0 auto;
  background: #EAEAEA;
  box-sizing: border-box;
`;

const Text = styled.div`
position: relative;
z-index: 3;

`

export class HealthDisplay extends React.Component {
  render() {
    const healthPercentage = this.props.health / this.props.maxHealth * 100;
    return (
      <div>
        <MaxHealthContainer>
          <CurrentHealthContainer healthPercentage={healthPercentage} />
          <Text>{this.props.health} / {this.props.maxHealth}</Text>
        </MaxHealthContainer>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  health: state.playerReducer.health,
  maxHealth: state.playerReducer.maxHealth
})
export default connect(mapStateToProps, null)(HealthDisplay)
