import React from "react";
import styled from "styled-components";

const Tile = styled.div`
  width: 12px;
  height: 12px;

  background: ${props => {
    if (props.on) {
      return "green";
    } else if (props.player) {
      return "red";
    } else {
      return "grey";
    }
  }};
`;

export class DungeonTile extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.on !== nextProps.on;
  }
  render() {
    return <Tile id={this.props.index} player={this.props.player} on={this.props.on} />;
  }
}
export default DungeonTile;
