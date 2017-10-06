import React from "react";
import styled from "styled-components";
import { connect } from 'react-redux'

const TextContainer = styled.div`
  border: 1px solid;
  padding: 3px;
  min-width: 150px;
  height: 120px;
`;

const InfoText = styled.h5`
  margin: 5px 0px 5px 0px;
  text-align: left;
  font-weight: normal;
  font-size: 1rem;
`;

export class InfoDisplay extends React.Component {
  render() {
    return (
      <TextContainer>
        <InfoText>weapon: {this.props.weapon}</InfoText>
        <InfoText>attack: {this.props.weaponDamage}</InfoText>
        <InfoText>level: {this.props.level}</InfoText>
      </TextContainer>
    );
  }
}
const mapStateToProps = state => ({
  weapon: state.playerReducer.weapon,
  weaponDamage:state.playerReducer.weaponDamage,
  level: state.playerReducer.level
})
export default connect(mapStateToProps, null)(InfoDisplay)
