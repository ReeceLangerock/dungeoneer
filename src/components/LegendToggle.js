import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'

const Info = styled.span`
position: absolute;
left: 15px;
top: 10px;
cursor: pointer;
font-size: 40px;
color: ${props => (props.info ? '#B9A938' : 'white')};`

export class LegendToggle extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.toggleInfo()
  }
  render () {
    return <Info onClick={this.handleClick} info={this.props.info}><i className='fa fa-question' aria-hidden='true' /></Info>
  }
}
const mapStateToProps = state => ({
  info: state.dungeonReducer.info
})
export default connect(mapStateToProps, actions)(LegendToggle)
