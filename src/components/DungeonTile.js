import React from 'react'
import styled from 'styled-components'

const Tile = styled.div`
  width: 12px;
  height: 12px;
  font-size: 7px;
  z-index: ${props => {
    if (props.entity && props.entity.entity === 'floor') {
    } else {
      return 5
    }
  }};
  background: ${props => {
    if (props.player) {
      return 'blue'
    }

    if (props.entity.entity === 'enemy') {
      return 'red'
    } else if (props.entity.entity === 'weapon') {
      return 'yellow'
    } else if (props.entity.entity === 'portal') {
      return 'purple'
    }
    else if (props.entity.entity === 'health') {
      return 'green'
    } else if (props.entity.entity === 'floor') {
      return 'white'
    } else {
      return 'grey'
    }
  }};
`

export class DungeonTile extends React.Component {
  shouldComponentUpdate (nextProps) {
    return this.props.player !== nextProps.player || this.props.entity.entity !== nextProps.entity.entity
  }
  render () {
    return <Tile id={this.props.index} player={this.props.player} entity={this.props.entity} />
  }
}
export default DungeonTile
