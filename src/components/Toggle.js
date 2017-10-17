import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'

const Lightbulb = styled.span`
position: absolute;
right: 15px;
top: 10px;
cursor: pointer;
font-size: 40px;
color: ${props => (props.lights ? '#B9A938' : 'white')};`

export class Toggle extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.toggleLights()
  }
  render () {
    return <Lightbulb onClick={this.handleClick} lights={this.props.lights}><i className='fa fa-lightbulb-o' aria-hidden='true' /></Lightbulb>
  }
}
const mapStateToProps = state => ({
  lights: state.dungeonReducer.lights
})
export default connect(mapStateToProps, actions)(Toggle)
