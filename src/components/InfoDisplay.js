import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const TextContainer = styled.div`
  border: 1px solid;
  padding: 5px;
  min-width: 200px;
  height: 125px;
  background: #EAEAEA;
  @media (max-width: 550px) { 
    min-width: 120px;
    height: 75px;
  
  }
`

const InfoText = styled.h5`
  margin: 5px 0px 5px 0px;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: #7f1517;
  word-wrap: nowrap;
  @media (max-width: 550px) { 
  font-size: .8rem;
    
    }
`

export class InfoDisplay extends React.Component {
  render () {
    return (
      <TextContainer>
        <InfoText><b>WEAPON: </b> {this.props.weapon}</InfoText>
        <InfoText><b>ATTACK: </b> {this.props.weaponDamage}</InfoText>
        <InfoText><b>LEVEL: </b>{this.props.level}</InfoText>
        <InfoText><b>ENEMIES SLAIN: </b>{this.props.enemiesSlain}</InfoText>
      </TextContainer>
    )
  }
}
const mapStateToProps = state => ({
  weapon: state.playerReducer.weapon,
  weaponDamage: state.playerReducer.weaponDamage,
  level: state.playerReducer.level,
  enemiesSlain: state.dungeonReducer.enemiesSlain
})
export default connect(mapStateToProps, null)(InfoDisplay)
