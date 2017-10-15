import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux'

const CurrentHealthContainer = styled.div`
  position: absolute;
  top: 0px;
  width: ${props => props.healthPercentage}%;
  z-index: 1;
  background-color: #B9A938;
  height: 100%;
`;

const MaxHealthContainer = styled.div`
  font-size: 1rem;

  padding: 2px 0px 2px 0px;
  position: relative;
  overflow: hidden;
  height: 25px;
  width: 100%;
  border: 2px solid #8B7E2A;
  border-radius: 10px;
  margin: 0px 5px 0px 5px;
  line-height: 25px;
  background: #EAEAEA;
  
  
`;

const Text = styled.div`
position: relative;
z-index: 3;
font-size:1.25rem;

`

export class ExpBar extends React.Component {
  render() {
    const expPercentage = this.props.exp / this.props.expNeeded * 100;
    return (
      <MaxHealthContainer>
       <Text> {this.props.exp} / {this.props.expNeeded} </Text>
        <CurrentHealthContainer healthPercentage={expPercentage} />
      </MaxHealthContainer>
    );
  }
}
const mapStateToProps = state => ({
  exp: state.playerReducer.exp,
  expNeeded:state.playerReducer.expNeeded,
})
export default connect(mapStateToProps, null)(ExpBar)

