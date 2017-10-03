import React from 'react'
import styled from 'styled-components'

const Tile = styled.div`
  width: 12px;
  height: 12px;
  font-size: 7px;
  z-index: ${props => {
    if (props.on) {
    } else {
      return 5
    }
  }};
  background: ${props => {
    if (props.player) {
      return 'blue'
    } else if (props.enemy) {
      return 'red'
    } else if (props.weapon) {
      return 'yellow'
    } else if (props.portal) {
      return 'purple'
    } else if (props.on) {
      return 'green'
    } else {
      return 'grey'
    }
  }};
`

export class DungeonTile extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.on !== nextProps.on ||
      this.props.player !== nextProps.player ||
      this.props.enemy !== nextProps.enemy ||
      this.props.portal !== nextProps.portal ||
      this.props.weapon !== nextProps.weapon
    )
  }
  render () {
    console.log('render count')

    return <Tile id={this.props.index} player={this.props.player} on={this.props.on} enemy={this.props.enemy} weapon={this.props.weapon} portal={this.props.portal} />
  }
}
export default DungeonTile
