import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'

const Message = styled.div`
font-family: 'OptimusPrinceps';
color: #7f1517;
background: #191919;
flex-grow: 1;
display: flex;
font-size: 5rem;
justify-content: center;
flex-direction: column;
align-items: center;
z-index:10;
transition: 1s all fade-in-out;
`

const Button = styled.button`
padding: 10px 10px;
border: 2px solid #7f1517;
color: #7f1517;
font-size: 1.5rem;
background: #191919;
cursor: pointer;

:hover {
  background: #7f1517;
  
  color: #191919;
  transition: .5s ease-in-out;
}
`

export class GameMessage extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.updateGameStatus('init')
  }
  render () {
    return (
      <Message>
        {this.props.message}
        {this.props.message === 'You Died' && <Button onClick={this.handleClick}>Try Again?</Button>}
        {this.props.message === 'Victory!' && <Button onClick={this.handleClick}>Play Again?</Button>}
      </Message>
    )
  }
}

// const mapStateToProps = state => ({})

export default connect(null, actions)(GameMessage)
