import React from 'react'
import styled from 'styled-components'

import DungeonTile from './DungeonTile'
import DungeonMaster from './../javascript/dungeon-master.js'
import { connect } from 'react-redux'
import * as actions from './../redux/actions/actions'
import GameMessage from './GameMessage'

const DungeonContainer = styled.div`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  // height: 452px;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

`

export class Dungeon extends React.Component {
  constructor (props) {
    super(props)

    this.handleMove = this.handleMove.bind(this)
    this.setWindowSize = this.setWindowSize.bind(this)
    this.state = {
      dungeon: false
    }
  }
  setWindowSize () {
    let maxWidth = Math.min(window.innerWidth - 12, 1200)
    maxWidth = maxWidth - maxWidth % 24
    let maxHeight = Math.min(window.innerHeight - 240, 600)
    maxHeight = maxHeight - maxHeight % 24

    this.setState(
      {
        width: maxWidth,
        height: maxHeight
      },
      this.centerCamera(this.state.playerPosition, maxWidth)
    )
  }

  // INITIALIZE DUNGEONS
  componentWillMount () {
    window.addEventListener('resize', this.setWindowSize)
    this.initialize()
    this.setWindowSize()
  }
  componentWillReceiveProps (newProps) {
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
  handleMove (vector, direction) {
    var currentPlayerPosition = Object.assign([], this.state.playerPosition)
    let newPosition = []
    newPosition[0] = currentPlayerPosition[0] + vector[0]
    newPosition[1] = currentPlayerPosition[1] + vector[1]
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
      default:
        return
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
        this.handleGameOver('dead')
        return false
      }
      if (enemy.entity === 'boss') {
        enemy.health = enemy.health - playerAttack
        this.setState({
          boss: enemy
        })
      } else {
        const dungeon = this.state.dungeon
        dungeon[enemyLoc[0]][enemyLoc[1]].health = dungeon[enemyLoc[0]][enemyLoc[1]].health - playerAttack

        this.setState({
          dungeon
        })
      }
      this.props.removeHealth(enemyAttack)
    } else if (playerAttack >= enemy.health) {
      if (enemy.entity === 'boss') {
        this.handleGameOver('victory')
      }
      this.props.gainExp(enemy.exp)
      this.props.enemySlain()
      const dungeon = this.state.dungeon
      dungeon[enemyLoc[0]][enemyLoc[1]].entity = 'floor'
      this.setState({
        dungeon
      })

      return true
    }
    return false
  }

  handleWeapon (weapon, weaponLoc) {
    const dungeon = this.state.dungeon
    dungeon[weaponLoc[0]][weaponLoc[1]].entity = 'floor'
    this.setState({
      dungeon
    })

    this.props.equipNewWeapon(weapon)
  }

  handlePortal () {
    let dungeonLevel = this.props.currentDungeonLevel + 1
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
    }
  }

  handleHealthPickup (health, healthLoc) {
    const dungeon = this.state.dungeon
    dungeon[healthLoc[0]][healthLoc[1]].entity = 'floor'
    this.setState({
      dungeon
    })

    this.props.addHealth(health.health)
  }

  handleGameOver (status) {
    this.props.updateGameStatus(status)
    this.props.resetGame()
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
      default:
        break
    }
    this.setState({
      firstVisibleRow,
      firstVisibleColumn,
      lastVisibleRow,
      lastVisibleColumn
    })
  }

  centerCamera (newStart = [50, 50], maxWidth = this.state.width, maxHeight = this.state.height) {
    let widthDiff = Math.floor(maxWidth / 12 / 2)
    let heightDiff = Math.floor(maxHeight / 12 / 2)
    let firstVisibleRow = newStart[0] - heightDiff > 0 ? newStart[0] - heightDiff : 0
    let lastVisibleRow = newStart[0] + heightDiff < 100 ? newStart[0] + heightDiff : 100
    let firstVisibleColumn = newStart[1] - widthDiff > 0 ? newStart[1] - widthDiff : 0
    let lastVisibleColumn = firstVisibleColumn + maxWidth / 12
    this.setState({
      firstVisibleRow: firstVisibleRow,
      lastVisibleRow: lastVisibleRow,
      firstVisibleColumn: firstVisibleColumn,
      lastVisibleColumn
    })
  }

  // RENDERING
  renderDungeonTiles () {
    if (this.state.dungeon && this.props.gameStatus === 'active') {
      let tiles = []
      let player = false
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
          tiles.push(<DungeonTile index={`tileR${r}C${c}`} row={r} key={`tileR${r}C${c}`} darkness={darkness} entity={entity} player={player} />)
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
        <DungeonContainer width={this.state.width} height={this.state.height}>
          {this.renderDungeonTiles()}
        </DungeonContainer>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  weaponDamage: state.playerReducer.weaponDamage,
  health: state.playerReducer.health,
  lights: state.dungeonReducer.lights,
  currentDungeonLevel: state.dungeonReducer.currentDungeonLevel,
  gameStatus: state.dungeonReducer.gameStatus
})
export default connect(mapStateToProps, actions, null, { withRef: true })(Dungeon)
