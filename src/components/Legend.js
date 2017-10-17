import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'

const Display = styled.span`
position: absolute;
left: 50%;
transform: translate(-50%, -50%);
width: ${window.innerWidth * 0.75 > 300 ? '300px' : '80%'};

top: 40%;
z-index: 8;
background: white;
border: 3px solid black;
cursor: pointer;
color: #7f1517;
padding: 5px;
box-shadow: 0 14px 28px rgba(255,255,255,0.25), 0 10px 10px rgba(255,255,255,0.22);
transition: .75s ease-in-out;
opacity: ${props => (props.info ? 100 : 0)};
cursor: ${props => (props.info ? 'pointer' : 'default')};

h1 {
  font-family: 'OptimusPrinceps';
  font-weight: normal;  
  font-size: 3rem;
  margin: 0px;
}

`
const Icon = styled.i`
color: ${props => props.color};
`
const LegendRow = styled.div`
padding: 1px 5px;
Display: flex;
font-size: 16px;
color: black;

justify-content: space-between;
`
export class Legend extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    if (this.props.info) {
      this.props.toggleInfo()
    }
  }
  render () {
    return (
      <Display onClick={this.handleClick} info={this.props.info}>
        <h1>How To Play</h1>
        <p>Use arrow keys or WASD to move your player. Defeat the boss lurking in the 4th level of the dungeon to win! </p>
        <hr />
        <h1>Legend</h1>

        <LegendRow>Player: <Icon className='fa fa-square' aria-hidden='true' color='#0000BA' /></LegendRow>
        <LegendRow>Enemy: <Icon className='fa fa-square' aria-hidden='true' color='#7f1517' /></LegendRow>
        <LegendRow>Health: <Icon className='fa fa-square' aria-hidden='true' color='#315C2B' /></LegendRow>
        <LegendRow>Weapon: <Icon className='fa fa-square' aria-hidden='true' color='#B9A938' /></LegendRow>
        <LegendRow>Portal: <Icon className='fa fa-square' aria-hidden='true' color='#701C6F' /></LegendRow>
      </Display>
    )
  }
}
const mapStateToProps = state => ({
  info: state.dungeonReducer.info
})
export default connect(mapStateToProps, actions)(Legend)
