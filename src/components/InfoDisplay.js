import React from "react";
import styled from "styled-components";

const TextContainer = styled.div`
  border: 1px solid;
  padding: 3px;
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
        <InfoText>attack: {this.props.attack}</InfoText>
        <InfoText>level: {this.props.level}</InfoText>
      </TextContainer>
    );
  }
}
export default InfoDisplay;
