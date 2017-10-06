import React from 'react'
import styled from 'styled-components'
import DungeonTile from './DungeonTile'
import DungeonMaster from './../javascript/dungeon-master.js'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'

const DungeonContainer = styled.div`
  width: 960px;
  // height: 552px;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`
export class Dungeon extends React.Component {
  constructor (props) {
    super(props)
    const dungeonMaster = new DungeonMaster()
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      dungeonZero: dungeonMaster.generateDungeon(),

      dungeonMaster,
      playerPosition: [50, 50]
    }
  }
  componentWillMount () {
    var startingPosition = this.state.dungeonMaster.placePlayer()
    let firstVisibleColumn = startingPosition[1] - 40 > 0 ? startingPosition[1] - 40 : 0
    let lastVisibleColumn = firstVisibleColumn + 80
    this.setState({
      playerPosition: startingPosition,
      firstVisibleRow: startingPosition[0] - 23 > 0 ? startingPosition[0] - 23 : 0,
      lastVisibleRow: startingPosition[0] + 23 < 100 ? startingPosition[0] + 23 : 100,
      firstVisibleColumn,
      lastVisibleColumn
    })
  }

  handleKeyDown (key) {
    // W - 87; A - 65; S - 83; D - 68;

    var currentPlayerPosition = Object.assign([], this.state.playerPosition)

    switch (key.keyCode) {
      case (38, 87):
        currentPlayerPosition[0] = currentPlayerPosition[0] - 1
        this.handleMove(currentPlayerPosition, 'north')
        break

      case (39, 68):
        currentPlayerPosition[1] = this.state.playerPosition[1] + 1
        this.handleMove(currentPlayerPosition, 'east')
        break
      case (40, 83):
        currentPlayerPosition[0] = this.state.playerPosition[0] + 1
        this.handleMove(currentPlayerPosition, 'south')
        break
      case (37, 65):
        currentPlayerPosition[1] = this.state.playerPosition[1] - 1
        this.handleMove(currentPlayerPosition, 'west')
        break
      default:
    }
  }

  handleMove (newPosition, direction) {
    let whosThere = this.findEntityAtNewPosition(newPosition)
    switch (whosThere.entity) {
      case 'floor':
        this.moveCamera(direction)

        this.setState({
          playerPosition: newPosition
        })
        break
      case 'enemy':
        // if combat doesn;t result in player killing enemy, return from handleMove without doing anything
        if (!this.handleCombat(whosThere, newPosition)) {
          return
        }

        break

      case 'weapon':
        this.handleWeapon(whosThere, newPosition)

        break
      case 'health':
        this.handleHealthPickup(whosThere, newPosition)

        break

      case 'portal':
        this.handlePortal()
        break
      default:
        return
        break
    }

    this.setState({
      playerPosition: newPosition
    })
  }
  handleCombat (enemy, enemyLoc) {
    let playerAttack = Math.floor(Math.random() * 5) + this.props.weaponDamage
    let enemyAttack = Math.floor(Math.random() * 5) + this.props.weaponDamage

    if (enemy.health > playerAttack) {
      if (enemyAttack > this.props.health) {
        console.log('ded')
        return false
      }
      this.state.dungeonZero[enemyLoc[0]][enemyLoc[1]].health = this.state.dungeonZero[enemyLoc[0]][enemyLoc[1]].health - playerAttack
      this.props.removeHealth(enemyAttack)
    } else if (playerAttack >= enemy.health) {
      let expGained = (this.props.level + 1) * enemy.exp
      this.props.gainExp()
      this.state.dungeonZero[enemyLoc[0]][enemyLoc[1]] = {
        entity: 'floor'
      }
      return true
    }
    return false
  }

  handleWeapon (weapon, weaponLoc) {
    this.state.dungeonZero[weaponLoc[0]][weaponLoc[1]] = {
      entity: 'floor'
    }
    this.props.equipNewWeapon(weapon)
  }

  handlePortal () {}

  handleHealthPickup (health, healthLoc) {
    this.state.dungeonZero[healthLoc[0]][healthLoc[1]] = {
      entity: 'floor'
    }
    this.props.addHealth(health.health)
  }

  findEntityAtNewPosition (newPosition) {
    if (typeof this.state.dungeonZero[newPosition[0]][newPosition[1]] === 'object') {
      return this.state.dungeonZero[newPosition[0]][newPosition[1]]
    } else {
      return this.state.dungeonZero[newPosition[0]][newPosition[1]]
    }
  }
  moveCamera (direction) {
    let firstVisibleColumn = this.state.firstVisibleColumn
    let firstVisibleRow = this.state.firstVisibleRow
    let lastVisibleRow = this.state.lastVisibleRow
    let lastVisibleColumn = this.state.lastVisibleColumn

    switch (direction) {
      case 'north':
        if (this.state.firstVisibleRow > 0) {
          firstVisibleRow = this.state.firstVisibleRow - 1
          lastVisibleRow = this.state.lastVisibleRow - 1
        }
        break
      case 'east':
        if (this.state.lastVisibleColumn < 100) {
          firstVisibleColumn = this.state.firstVisibleColumn + 1
          lastVisibleColumn = this.state.lastVisibleColumn + 1
        }
        break
      case 'south':
        if (this.state.lastVisibleRow < 100) {
          firstVisibleRow = this.state.firstVisibleRow + 1
          lastVisibleRow = this.state.lastVisibleRow + 1
        }
        break
      case 'west':
        if (this.state.firstVisibleColumn > 0) {
          firstVisibleColumn = this.state.firstVisibleColumn - 1
          lastVisibleColumn = this.state.lastVisibleColumn - 1
        }
        break
    }
    this.setState({
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
    let wall = false
    for (let r = this.state.firstVisibleRow; r < this.state.lastVisibleRow; r++) {
      for (let c = this.state.firstVisibleColumn; c < this.state.lastVisibleColumn; c++) {
        player = !!(r === this.state.playerPosition[0] && c === this.state.playerPosition[1])
        if (this.state.dungeonZero[r][c] === false) {
          wall = true
        }

        tiles.push(<DungeonTile index={index} row={r} key={`tile${index}`} entity={this.state.dungeonZero[r][c]} player={player} wall={wall} />)
        index++
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
const mapStateToProps = state => ({
  weapon: state.playerReducer.weapon,
  weaponDamage: state.playerReducer.weaponDamage,
  level: state.playerReducer.level
})
export default connect(mapStateToProps, actions)(Dungeon)
