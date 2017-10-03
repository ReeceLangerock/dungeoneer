import React from 'react'
import styled from 'styled-components'
import DungeonTile from './DungeonTile'
import DungeonMaster from './../javascript/dungeon-master.js'

const DungeonContainer = styled.div`
  width: 960px;
  height: 552px;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`

// const I = styled.i``;

export class Dungeon extends React.Component {
  constructor (props) {
    super(props)
    const dungeonMaster = new DungeonMaster()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      dungeonZero: dungeonMaster.generateDungeon(),
      firstVisibleRow: 27,
      firstVisibleColumn: 10,
      lastVisibleRow: 73,
      lastVisibleColumn: 90,
      dungeonMaster,
      playerPosition: [50, 50]
    }
  }
  componentWillMount () {
    var startingPosition = this.state.dungeonMaster.placePlayer()
    this.setState({
      playerPosition: startingPosition,
      firstVisibleRow: startingPosition[0] - 23 > 0 ? startingPosition[0] - 23 : 0,
      lastVisibleRow: startingPosition[0] + 23 < 100 ? startingPosition[0] + 23 : 100
      // firstVisibleColumn: startingPosition[1]-40 > 0 ? startingPosition[1]-40 : 0,
      // lastVisibleColumn: startingPosition[1]+40 < 100 ? startingPosition[1]+40 : 100
    })
  }

  handleKeyDown (key) {
    // W - 87; A - 65; S - 83; D - 68;
    let firstVisibleColumn = this.state.firstVisibleColumn
    let firstVisibleRow = this.state.firstVisibleRow
    let lastVisibleRow = this.state.lastVisibleRow
    let lastVisibleColumn = this.state.lastVisibleColumn

    let playerPosition = this.state.playerPosition

    switch (key.keyCode) {
      case (38, 87):
        if (this.state.dungeonZero[playerPosition[0] - 1][playerPosition[1]] === true) {
          if (this.state.firstVisibleRow > 0) {
            firstVisibleRow = this.state.firstVisibleRow - 1
            lastVisibleRow = this.state.lastVisibleRow - 1
          }
          playerPosition[0] = this.state.playerPosition[0] - 1
        }
        break

      case (39, 68):
        if (this.state.dungeonZero[playerPosition[0]][playerPosition[1] + 1] === true) {
          if (this.state.lastVisibleColumn < 100) {
            firstVisibleColumn = this.state.firstVisibleColumn + 1
            lastVisibleColumn = this.state.lastVisibleColumn + 1
          }
          playerPosition[1] = this.state.playerPosition[1] + 1
        }
        break
      case (40, 83):
        if (this.state.dungeonZero[playerPosition[0] + 1][playerPosition[1]] === true) {
          if (this.state.lastVisibleRow < 100) {
            firstVisibleRow = this.state.firstVisibleRow + 1
            lastVisibleRow = this.state.lastVisibleRow + 1
          }
          playerPosition[0] = this.state.playerPosition[0] + 1
        }
        break
      case (37, 65):
        if (this.state.dungeonZero[playerPosition[0]][playerPosition[1] - 1] === true) {
          if (this.state.firstVisibleColumn > 0) {
            firstVisibleColumn = this.state.firstVisibleColumn - 1
            lastVisibleColumn = this.state.lastVisibleColumn - 1
          }
          playerPosition[1] = this.state.playerPosition[1] - 1
        }
        break
      default:
    }


    this.setState({
      playerPosition,
      firstVisibleRow,
      firstVisibleColumn,
      lastVisibleRow,
      lastVisibleColumn
    })
  }

  renderDungeonTiles () {
    let tiles = []
    let index = 0
    let player = false
    let enemy = false, portal = false, weapon = false;
    for (let r = this.state.firstVisibleRow; r < this.state.lastVisibleRow; r++) {
      for (let c = this.state.firstVisibleColumn; c < this.state.lastVisibleColumn; c++) {
        player = !!(r === this.state.playerPosition[0] && c === this.state.playerPosition[1])
        
        if (this.state.dungeonZero[r][c]) {
          enemy = this.state.dungeonZero[r][c].entity === 'enemy'
          weapon = this.state.dungeonZero[r][c].entity === 'weapon'
          portal = this.state.dungeonZero[r][c].entity === 'portal'
          // console.log(this.state.dungeonZero[r][c].entity === 'enemy')
        }
        tiles.push(<DungeonTile index={index} row={r} key={`tile${index}`} player={player} portal = {portal} weapon = {weapon} enemy = {enemy} on={this.state.dungeonZero[r][c]} />)
        index++
        enemy = false, weapon = false, portal = false;
      }
    }

    return tiles
  }
  render () {
    return (
      <div>
        <DungeonContainer tabIndex='0' onKeyDown={this.handleKeyDown}>
          {this.renderDungeonTiles()}
        </DungeonContainer>
      </div>
    )
  }
}
export default Dungeon
