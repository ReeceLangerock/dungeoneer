import React from 'react'
import styled, { injectGlobal } from 'styled-components'

import DungeonTile from './DungeonTile'
import DungeonMaster from './../javascript/dungeon-master.js'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'
import GameMessage from './GameMessage'

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
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      dungeon: false,
      lightsOut: false
    }
  }

  // INITIALIZE DUNGEONS
  componentWillMount () {
    this.initialize()
  }
  componentWillReceiveProps (newProps) {
    console.log(newProps.gameStatus)
    if (newProps.gameStatus === 'init') {
      this.initialize()
    }
  }
  initialize () {
    const dungeonMaster = new DungeonMaster()
    dungeonMaster
      .generateDungeon()
      .then((response, error) => {
        var startingPosition = dungeonMaster.placePlayer()
        this.setState({
          dungeon: response,

          dungeonMaster,
          playerPosition: startingPosition
        })
        this.centerCamera(startingPosition)
      })
      .then(() => {
        this.prepareNext(1)
        this.prepareNext(2)
        this.prepareNext(3)
        this.prepareNext(4)
        this.props.updateGameStatus('active')
      })
  }

  prepareNext (next) {
    // prep next dungeon
    const dungeonMaster = new DungeonMaster(next)

    dungeonMaster.generateDungeon().then(response => {
      let newStart = dungeonMaster.placePlayer()
      let boss = next ? dungeonMaster.getBoss() : 'none'

      this.setState({
        [`dungeon${next}`]: response,
        [`startingPosition${next}`]: newStart,
        boss: boss
      })
    })
  }

  // MOVEMENT HANDLING
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

      case 69:
        this.handlePortal()
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
      case 'boss':
        // if combat doesn;t result in player killing enemy, return from handleMove without doing anything
        if (whosThere.entity === 'boss') {
          whosThere = this.state.boss
        }
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
        return
        break
      default:
        return
        break
    }

    this.setState({
      playerPosition: newPosition
    })
  }

  // PLAYER ACTION HANDLING
  handleCombat (enemy, enemyLoc) {
    let playerAttack = Math.floor(Math.random() * 5) + this.props.weaponDamage
    let enemyAttack = Math.floor(Math.random() * 5) + enemy.damage

    if (enemy.health > playerAttack) {
      if (enemyAttack > this.props.health) {
        this.props.updateGameStatus('dead')
        return false
      }
      if (enemy.entity === 'boss') {
        enemy.health = enemy.health - playerAttack
        this.setState({
          boss: enemy
        })
      } else {
        this.state.dungeon[enemyLoc[0]][enemyLoc[1]].health = this.state.dungeon[enemyLoc[0]][enemyLoc[1]].health - playerAttack
      }
      this.props.removeHealth(enemyAttack)
    } else if (playerAttack >= enemy.health) {
      if (enemy.entity === 'boss') {
        this.handleGameOver('victory')
      }
      let expGained = enemy.exp
      this.props.gainExp(expGained)
      this.props.enemySlain()
      this.state.dungeon[enemyLoc[0]][enemyLoc[1]] = {
        entity: 'floor'
      }
      return true
    }
    return false
  }

  handleWeapon (weapon, weaponLoc) {
    this.state.dungeon[weaponLoc[0]][weaponLoc[1]] = {
      entity: 'floor'
    }
    this.props.equipNewWeapon(weapon)
  }

  handlePortal () {
    let dungeonLevel = this.props.dungeonLevel + 1
    if (dungeonLevel < 5) {
      let newStart = this.state[`startingPosition${dungeonLevel}`]
      this.setState(
        {
          dungeon: this.state[`dungeon${dungeonLevel}`],
          playerPosition: newStart
        },
        this.centerCamera(newStart)
      )
      this.props.updateDungeonLevel(dungeonLevel)
    } else {
      // handle game over
    }
  }

  handleHealthPickup (health, healthLoc) {
    this.state.dungeon[healthLoc[0]][healthLoc[1]] = {
      entity: 'floor'
    }
    this.props.addHealth(health.health)
  }

  handleGameOver (status) {
    this.props.updateDungeonLevel(1)
    this.props.updateGameStatus(status)
  }
  findEntityAtNewPosition (newPosition) {
    if (typeof this.state.dungeon[newPosition[0]][newPosition[1]] === 'object') {
      return this.state.dungeon[newPosition[0]][newPosition[1]]
    } else {
      return this.state.dungeon[newPosition[0]][newPosition[1]]
    }
  }

  // CAMERA HANDLING
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

  centerCamera (newStart) {
    let firstVisibleRow = newStart[0] - 23 > 0 ? newStart[0] - 23 : 0
    let LastVisibleRow = newStart[0] + 23 < 100 ? newStart[0] + 23 : 100
    let firstVisibleColumn = newStart[1] - 40 > 0 ? newStart[1] - 40 : 0
    let lastVisibleColumn = firstVisibleColumn + 80
    this.setState({
      firstVisibleRow: firstVisibleRow,
      lastVisibleRow: LastVisibleRow,
      firstVisibleColumn: firstVisibleColumn,
      lastVisibleColumn
    })
  }

  // RENDERING

  renderDungeonTiles () {
    if (this.state.dungeon && this.props.gameStatus === 'active') {
      let tiles = []
      let index = 0
      let player = false
      let wall = false
      let darkness = false
      const sight = 8
      for (let r = this.state.firstVisibleRow; r < this.state.lastVisibleRow; r++) {
        for (let c = this.state.firstVisibleColumn; c < this.state.lastVisibleColumn; c++) {
          // if lights are false, then create darkness
          if (!this.props.lights) {
            const xDiff = Math.abs(this.state.playerPosition[0] - r)
            const yDiff = Math.abs(this.state.playerPosition[1] - c)

            darkness = xDiff > sight || yDiff > sight || Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) >= sight
          }
          player = !!(r === this.state.playerPosition[0] && c === this.state.playerPosition[1])
          let entity
          if (this.state.dungeon[r][c] !== undefined) {
            entity = this.state.dungeon[r][c].entity
          } else {
            entity = 'wall'
          }
          tiles.push(<DungeonTile index={index} row={r} key={`tile${index}`} darkness={darkness} entity={entity} player={player} />)
          index++
        }
      }

      return tiles
    } else if (this.props.gameStatus === 'dead') {
      return <GameMessage message='You Died' />
    } else if (this.props.gameStatus === 'victory') {
      return <GameMessage message='Victory!' />
    } else {
      return <GameMessage message='Loading...' />
    }
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
  level: state.playerReducer.level,
  health: state.playerReducer.health,
  lights: state.dungeonReducer.lights,
  currentDungeonLevel: state.dungeonReducer.currentDungeonLevel,
  gameStatus: state.dungeonReducer.gameStatus
})
export default connect(mapStateToProps, actions)(Dungeon)
