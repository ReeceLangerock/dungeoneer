import React, { Component } from 'react'
import './App.css'
import styled from 'styled-components'

import PlayerInfoContainer from './components/PlayerInfoContainer'
import Header from './components/Header'
import Dungeon from './components/Dungeon'

import { Provider } from 'react-redux'
import store, { history } from './redux/store/store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>

        <Container className='App'>
          <Header />
          <Dungeon />
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
background: darkgrey;
`
