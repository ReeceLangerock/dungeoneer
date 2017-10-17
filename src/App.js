import React, { Component } from 'react'
import './App.css'
import styled, { injectGlobal } from 'styled-components'

import PlayerInfoContainer from './components/PlayerInfoContainer'
import Header from './components/Header'
import Dungeon from './components/Dungeon'
import Toggle from './components/Toggle'
import LegendToggle from './components/LegendToggle'
import Legend from './components/Legend'

import { Provider } from 'react-redux'
import store from './redux/store/store'

import OptimusPrinceps from './OptimusPrinceps.ttf'

injectGlobal`
  @font-face {
    font-family: 'OptimusPrinceps';
    src: url('${OptimusPrinceps}');
  }
  
`

class App extends Component {
  constructor (props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      moveDirection: ''
    }
  }
  // MOVEMENT HANDLING
  handleKeyDown (key) {
    // this.child.test()
    // W - 87; A - 65; S - 83; D - 68;
    let direction = ''
    let vector = []
    switch (key.keyCode) {
      case 87:
      case 38:
        direction = 'north'
        vector = [-1, 0]
        break
      case 68:
      case 39:
        direction = 'east'
        vector = [0, 1]
        break
      case 83:
      case 40:
        direction = 'south'
        vector = [1, 0]
        break
      case 65:
      case 37:
        direction = 'west'
        vector = [0, -1]
        break
      // case 69:
      // this.handlePortal()
      default:
        return
    }
    this.child.wrappedInstance.handleMove(vector, direction)
  }
  render () {
    return (
      <Provider store={store}>

        <Container className='App' tabIndex='0' onKeyDown={this.handleKeyDown}>
          <LegendToggle />
          <Legend />

          <Toggle />
          <Header />
          <Dungeon
            ref={instance => {
              this.child = instance
            }}
          />
          <PlayerInfoContainer />
        </Container>
      </Provider>
    )
  }
}

export default App

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
max-width: 100vw;
min-height: 100vh;
overflow: hidden;
position: relative;
background: #191919;
:focus {
  outline: none
}

// background: darkgrey;
`
