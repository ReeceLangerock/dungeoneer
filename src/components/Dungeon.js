import React from "react";
import styled from "styled-components";
import DungeonTile from "./DungeonTile";
import DungeonMaster from "./../javascript/dungeon-master.js";

const DungeonContainer = styled.div`
  width: 960px;
  height: 552px;
  background-color: grey;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
`;

// const I = styled.i``;

export class Dungeon extends React.Component {
  constructor(props) {
    super(props);
    const dungeonMaster = new DungeonMaster();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      dungeonZero: dungeonMaster.generateEmptyDungeon(),
      firstVisibleRow: 27,
      firstVisibleColumn: 10,
      lastVisibleRow: 73,
      lastVisibleColumn: 90
    };
  }
  componentWillMount() {}

  handleKeyDown(key) {
    // W - 87; A - 65; S - 83; D - 68;
    let firstVisibleColumn = this.state.firstVisibleColumn;
    let firstVisibleRow = this.state.firstVisibleRow;
    let lastVisibleRow = this.state.lastVisibleRow;
    let lastVisibleColumn = this.state.lastVisibleColumn;

    switch (key.keyCode) {
      case (38, 87):
        if (this.state.firstVisibleRow > 0) {
          firstVisibleRow = this.state.firstVisibleRow - 1;
          lastVisibleRow = this.state.lastVisibleRow - 1;
        }
        break;

      case (39, 68):
        if (this.state.lastVisibleColumn < 100) {
          firstVisibleColumn = this.state.firstVisibleColumn + 1;
          lastVisibleColumn = this.state.lastVisibleColumn + 1;
        }
        break;
      case (40, 83):
        if (this.state.lastVisibleRow < 100) {
          firstVisibleRow = this.state.firstVisibleRow + 1;
          lastVisibleRow = this.state.lastVisibleRow + 1;
        }
        break;
      case (37, 65):
        if (this.state.firstVisibleColumn > 0) {
          firstVisibleColumn = this.state.firstVisibleColumn - 1;
          lastVisibleColumn = this.state.lastVisibleColumn - 1;
        }
        break;
    }


    this.setState({
      firstVisibleRow,
      firstVisibleColumn,
      lastVisibleRow,
      lastVisibleColumn
    });
  }

  renderDungeonTiles() {
    let tiles = [];
    let index = 0;
    let player = false;
    for (let r = this.state.firstVisibleRow; r < this.state.lastVisibleRow; r++) {
      for (let c = this.state.firstVisibleColumn; c < this.state.lastVisibleColumn; c++) {
        player = r === this.state.firstVisibleRow + 23 && c === this.state.firstVisibleColumn + 40 ? true : false;
        tiles.push(<DungeonTile index={index} key={`tile${index}`} player={player} on={this.state.dungeonZero[r][c]} />);
        index++;
      }
    }

    return tiles;
  }
  render() {
    return (
      <div>
        <DungeonContainer tabIndex="0" onKeyDown={this.handleKeyDown}>
          {this.renderDungeonTiles()}
        </DungeonContainer>
      </div>
    );
  }
}
export default Dungeon;
