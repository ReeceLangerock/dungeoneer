// REFACTOR THIS TO USE MODULE PATTERN
// -------------------------------------------------
import entities from './dungeonEntities.json'

class DungeonMaster {
  constructor (dungeonLevel = 0) {
    this.totalRooms = Math.floor(30 + Math.random() * 5)
    // this.totalRooms = 2
    this.dungeonHeight = 100
    this.dungeonLevel = dungeonLevel
    this.dungeonWidth = 100
    this.dungeon = []
    this.rooms = []
    this.filledTiles = []
    this.dungeonReady
  }

  generateDungeon () {
    // let index = 0
    for (let i = 0; i < this.dungeonWidth; i++) {
      this.dungeon.push([])
      for (let j = 0; j < this.dungeonHeight; j++) {
        this.dungeon[i][j] = {
          entity: 'wall'
        }
      }
    }
    this.generateRandomRooms()
    console.log('place')

    //  dungeon[first.roomTopRow,[first.roomLeftCol].on = true;
    this.placeHealth()
    this.placeEnemies()
    this.placeWeapon()
    this.placePortal()
    this.dungeonReady = true
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
        this.dungeon[i][j] = {
          entity: 'floor'
        }
      }
    }
  }

  connectRooms (roomToConnect) {
    let r = roomToConnect.connector[0]
    let c = roomToConnect.connector[1]
    if (r && c) {
      this.dungeon[r][c] = {
        entity: 'floor'
      }
    }
  }

  placePlayer () {
    let randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)]
    let xCoord = randomRoom.roomLeftCol + Math.floor(Math.random() * randomRoom.roomWidth)
    let yCoord = randomRoom.roomTopRow + Math.floor(Math.random() * randomRoom.roomHeight)

    this.filledTiles.push({
      entity: 'player',
      x: xCoord,
      y: yCoord
    })

    return [xCoord, yCoord]
  }

  placeEnemies () {
    let numEnemies = 5
    while (numEnemies) {
      let randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)]
      let xCoord = randomRoom.roomLeftCol + Math.floor(Math.random() * randomRoom.roomWidth)
      let yCoord = randomRoom.roomTopRow + Math.floor(Math.random() * randomRoom.roomHeight)

      for (let i = 0; i < this.filledTiles.length; i++) {
        if (this.filledTiles[i].x === xCoord && this.filledTiles[i].y == yCoord) {
          continue
        }
      }
      this.dungeon[xCoord][yCoord] = {
        entity: 'enemy',
        health: 10,
        damage: 5,
        x: xCoord,
        y: yCoord
      }

      this.filledTiles.push({
        entity: 'enemy',
        x: xCoord,
        y: yCoord
      })
      numEnemies--
    }
  }

  placeHealth () {
    let numHealth = 3
    while (numHealth) {
    let randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)]
    let xCoord = randomRoom.roomLeftCol + Math.floor(Math.random() * randomRoom.roomWidth)
    let yCoord = randomRoom.roomTopRow + Math.floor(Math.random() * randomRoom.roomHeight)

    for (let i = 0; i < this.filledTiles.length; i++) {
      if (this.filledTiles[i].x === xCoord && this.filledTiles[i].y == yCoord) {
        continue
      }
    }
    this.dungeon[xCoord][yCoord] = {
      entity: 'health',
      health: 15 * (this.dungeonLevel + 1),
      x: xCoord,
      y: yCoord
    }

    this.filledTiles.push({
      entity: 'health',

      health: 20 * (this.dungeonLevel + 1),
      x: xCoord,
      y: yCoord
    })
    numHealth--
  }
  }

  placeWeapon () {
    let randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)]
    let xCoord = randomRoom.roomLeftCol + Math.floor(Math.random() * randomRoom.roomWidth)
    let yCoord = randomRoom.roomTopRow + Math.floor(Math.random() * randomRoom.roomHeight)

    for (let i = 0; i < this.filledTiles.length; i++) {
      if (this.filledTiles[i].x === xCoord && this.filledTiles[i].y == yCoord) {
        continue
      }
    }
    this.dungeon[xCoord][yCoord] = {
      entity: 'weapon',
      weaponName: entities.weapons.dungeonZero[0],
      weaponDamage: 5,
      x: xCoord,
      y: yCoord
    }

    this.filledTiles.push({
      entity: 'weapon',
      weaponName: entities.weapons.dungeonZero[0],
      weaponDamage: 5,
      x: xCoord,
      y: yCoord
    })
  }

  placePortal () {
    let randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)]
    let xCoord = randomRoom.roomLeftCol + Math.floor(Math.random() * randomRoom.roomWidth)
    let yCoord = randomRoom.roomTopRow + Math.floor(Math.random() * randomRoom.roomHeight)

    for (let i = 0; i < this.filledTiles.length; i++) {
      if (this.filledTiles[i].x === xCoord && this.filledTiles[i].y == yCoord) {
        continue
      }
    }
    this.dungeon[xCoord][yCoord] = {
      entity: 'portal',
      x: xCoord,
      y: yCoord
    }

    this.filledTiles.push({
      entity: 'portal',
      x: xCoord,
      y: yCoord
    })
  }

  updateRoomNeighbors (roomNumber, direction) {
    this.rooms[roomNumber].neighbors[direction] = true
  }

  generateRemainingRooms (lastRoom, roomNumber) {
    let validRoom = false
    let newRoom
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
      let roomHeight = Math.floor(4 + Math.random() * 10)
      let roomWidth = Math.floor(4 + Math.random() * 10)

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
        default:
          return 'FAILED_GENERATION'
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
        if (this.dungeon[i].slice(roomTopRow, roomBottomRow).every(tile => tile.entity === 'wall')) {
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
