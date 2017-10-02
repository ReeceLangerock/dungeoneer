// REFACTOR THIS TO USE MODULE PATTERN
// -------------------------------------------------

class DungeonMaster {
  constructor () {
    this.totalRooms = Math.floor(25 + Math.random() * 3)
    // this.totalRooms = 2
    this.dungeonHeight = 100
    this.dungeonWidth = 100
    this.dungeon = []
    this.rooms = []
  }

  generateDungeon () {
    let index = 0
    for (let i = 0; i < this.dungeonWidth; i++) {
      this.dungeon.push([])
      for (let j = 0; j < this.dungeonHeight; j++) {
        let randomLife = false

        // randomLife = Math.random() * 100 > 95 ? true : false;

        // let newDungeonTile = { row: i, col: j, index: index, on: randomLife }
        // this.dungeon[i].push(randomLife)
      }
    }
    this.generateRandomRooms()

    //  dungeon[first.roomTopRow,[first.roomLeftCol].on = true;
    console.log(this.rooms)
    return this.dungeon
  }

  generateRandomRooms () {
    this.rooms[0] = this.generateFirstRoom()
    this.fillInRoom(this.rooms[0])

    while (this.rooms.length < this.totalRooms) {
      let roomToBuildOffOf = Math.floor(Math.random() * this.rooms.length)
      let generationResult = this.generateRemainingRooms(this.rooms[roomToBuildOffOf], roomToBuildOffOf)
      if (generationResult !== 'FAILED_GENERATION') {
        this.rooms.push(generationResult)
        this.fillInRoom(generationResult)
        this.connectRooms(generationResult)
      }
    }
  }

  fillInRoom (roomToFill) {
    for (let j = roomToFill.roomTopRow; j < roomToFill.roomBottomRow; j++) {
      for (let i = roomToFill.roomLeftCol; i < roomToFill.roomRightCol; i++) {
        this.dungeon[i][j] = true
      }
    }
  }

  connectRooms (roomToConnect) {
    let r = roomToConnect.connector[0]
    let c = roomToConnect.connector[1]
    if (r && c) {
      this.dungeon[r][c] = true
    }
  }

  updateRoomNeighbors (roomNumber, direction) {
    this.rooms[roomNumber].neighbors[direction] = true
  }

  generateRemainingRooms (lastRoom, roomNumber) {
    let validRoom = false
    let newRoom
    let index = 0
    let north = false, east = false, south = false, west = false
    let directions = ['north', 'east', 'south', 'west']
    let direction

    // !validRoom

    while (!validRoom) {
      let connector = []
      let roomTopRow, roomBottomRow, roomLeftCol, roomRightCol

      direction = directions[Math.floor(Math.random() * directions.length)]
      if (directions.length === 0) {
        return 'FAILED_GENERATION'
      }
      let roomHeight = Math.floor(4 + Math.random() * 7)
      let roomWidth = Math.floor(4 + Math.random() * 7)

      let offsetWidth = 0 // Math.floor(Math.random() * roomWidth)
      let offsetHeight = 0 // Math.floor(Math.random() * roomHeight)

      switch (direction) {
        case 'north': // New Room North
          roomTopRow = lastRoom.roomTopRow - 1 - roomHeight
          roomBottomRow = lastRoom.roomTopRow - 1
          roomRightCol = lastRoom.roomLeftCol + roomWidth
          roomLeftCol = lastRoom.roomLeftCol
          this.updateRoomNeighbors(roomNumber, 'north')
          south = true
          let maxLeft = Math.max(lastRoom.roomLeftCol, roomLeftCol)
          let minRight = Math.min(lastRoom.roomRightCol, roomRightCol)
          connector = [Math.floor((maxLeft + minRight) / 2), roomBottomRow]
          directions.splice(directions.indexOf('north'), 1)
          break
        case 'east':
          roomTopRow = lastRoom.roomBottomRow - roomHeight
          roomBottomRow = lastRoom.roomBottomRow
          roomRightCol = lastRoom.roomRightCol + 1 + roomWidth
          roomLeftCol = lastRoom.roomRightCol + 1
          let maxTop = Math.max(lastRoom.roomTopRow, roomTopRow)
          let minBottom = Math.min(lastRoom.roomBottomRow, roomBottomRow)
          this.updateRoomNeighbors(roomNumber, 'east')
          connector = [roomLeftCol - 1, Math.floor((maxTop + minBottom) / 2)]
          west = true

          directions.splice(directions.indexOf('east'), 1)

          break

        case 'south':
          roomTopRow = lastRoom.roomBottomRow + 1
          roomBottomRow = lastRoom.roomBottomRow + 1 + roomHeight
          roomLeftCol = lastRoom.roomRightCol - roomWidth
          roomRightCol = lastRoom.roomRightCol
          connector = []
          maxLeft = Math.max(lastRoom.roomLeftCol, roomLeftCol)
          minRight = Math.min(lastRoom.roomRightCol, roomRightCol)
          connector = [Math.floor((maxLeft + minRight) / 2), roomTopRow - 1]
          directions.splice(directions.indexOf('south'), 1)

          break

        case 'west':
          roomTopRow = lastRoom.roomTopRow
          roomBottomRow = lastRoom.roomTopRow + roomHeight
          roomRightCol = lastRoom.roomLeftCol - 1
          roomLeftCol = lastRoom.roomLeftCol - 1 - roomWidth
          connector = []
          maxTop = Math.max(lastRoom.roomTopRow, roomTopRow)
          minBottom = Math.min(lastRoom.roomBottomRow, roomBottomRow)
          connector = [roomRightCol, Math.floor((maxTop + minBottom) / 2)]
          directions.splice(directions.indexOf('west'), 1)
          break
      }
      newRoom = {
        roomHeight,
        roomWidth,
        roomTopRow,
        roomBottomRow,
        roomRightCol,
        roomLeftCol,
        connector,
        neighbors: {
          north,
          east,
          south,
          west
        }
      }

      if (roomLeftCol < 1 || roomRightCol > this.dungeonWidth - 1 || roomTopRow < 1 || roomBottomRow > this.dungeonHeight - 1) {
        connector = []
        continue
      }
      // check if all spaces are clear
      var goodTiles = 0
      for (let i = roomLeftCol; i < roomRightCol; i++) {
        if (this.dungeon[i].slice(roomTopRow, roomBottomRow).every(tile => tile === false)) {
          goodTiles++
        }
      }
      if (roomWidth !== goodTiles) {
        connector = []

        continue
      }

      validRoom = true
    }
    if (validRoom) {
      return newRoom
    } else {
      return 'FAILED_GENERATION'
    }
  }

  generateFirstRoom () {
    let validRoom = false

    while (!validRoom) {
      let roomHeight = Math.floor(4 + Math.random() * 5)
      let roomWidth = Math.floor(4 + Math.random() * 5)
      let roomTopRow = Math.floor(40 + Math.random() * 20)
      let roomBottomRow = roomTopRow + roomHeight
      let roomLeftCol = Math.floor(40 + Math.random() * 20)
      let roomRightCol = roomLeftCol + roomWidth
      // console.log(`The room is ${roomHeight} high and ${roomWidth} wide`)
      // console.log(`The room begins at ${roomTopRow} and ends at ${roomBottomRow}`)
      // console.log(`The room begins at ${roomLeftCol} and ends at ${roomRightCol}`)

      if (roomTopRow > 0 && roomBottomRow < this.dungeonHeight && roomLeftCol > 0 && roomRightCol < this.dungeonWidth) {
        validRoom = true
        return {
          roomHeight,
          roomWidth,
          roomTopRow,
          roomBottomRow,
          roomRightCol,
          roomLeftCol,
          neighbors: {
            north: false,
            east: false,
            south: false,
            west: false
          }
        }
      }
    }
  }
}
export default DungeonMaster
