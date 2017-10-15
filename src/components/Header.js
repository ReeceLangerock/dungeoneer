import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Title = styled.div`
font-family: 'OptimusPrinceps';
color: #7f1517;
font-size: 2.75rem;
`

const Subtitle = styled.div`
font-family: 'OptimusPrinceps';
color: #7f1517;
font-size: 1.25rem;
margin-bottom: 3px;
`

export class Header extends React.Component {
  render () {
    return (
      <header>
        <Title>Dungeoneer</Title>
        <Subtitle>Level {this.props.currentDungeonLevel}</Subtitle>
      </header>
    )
  }
}
const mapStateToProps = state => ({
  currentDungeonLevel: state.dungeonReducer.currentDungeonLevel
})
export default connect(mapStateToProps)(Header)
