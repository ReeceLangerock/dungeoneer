import React from 'react'
import styled from 'styled-components'

const Tile = styled.div`
  width: 12px;
  height: 12px;
  font-size: 7px;
  z-index: ${props => {
    if (props.entity && props.entity === 'floor') {
    } else {
      return 5
    }
  }};
  background: ${props => {
    if (props.player) {
      return 'blue'
    }
    
    if (props.entity && props.entity === 'enemy') {
      return 'red'
    } else if (props.entity === 'weapon') {
      return 'yellow'
    } else if (props.entity === 'portal') {
      return 'purple'
    }
    else if (props.entity === 'health') {
      return 'green'
    } else if (props.entity === 'floor') {
      return 'white'
    } else {
      return 'grey'
    }
  }};
`

export class DungeonTile extends React.Component {
  shouldComponentUpdate (nextProps) {
    return this.props.player !== nextProps.player || this.props.entity !== nextProps.entity
  }
  render () {
    return <Tile id={this.props.index} player={this.props.player} entity={this.props.entity} />
  }
}
export default DungeonTile
