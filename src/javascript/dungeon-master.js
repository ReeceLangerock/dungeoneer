class DungeonMaster {
  constructor() {
    this.totalRooms = Math.floor(1 + Math.random() * 3);
    this.dungeonHeight = 100;
    this.dungeonWidth = 100;
  }

  generateEmptyDungeon() {
    let emptyDungeon = [];
    let index = 0;
    for (let i = 0; i < this.dungeonWidth; i++) {
      emptyDungeon.push([]);
      for (let j = 0; j < this.dungeonHeight; j++) {
        let randomLife = false;

        // randomLife = Math.random() * 100 > 95 ? true : false;

        let newDungeonTile = { row: i, col: j, index: index, on: randomLife };
        emptyDungeon[i].push(randomLife);
      }
    }
    let rooms = this.generateRandomRooms();

    for(let i = 0; i < rooms.length; i++){
    this.fillInRooms(emptyDungeon, rooms[i]);

    }
    //  emptyDungeon[first.roomStart[0],[first.roomStart[1]].on = true;
    return emptyDungeon;
  }

  generateRandomRooms() {
    let rooms = [];
    rooms[0] = this.generateFirstRoom();
    while (rooms.length < this.totalRooms) {
      let roomToBuildOffOf = Math.floor(Math.random() * rooms.length);
      let generationResult = this.generateRemainingRooms(rooms[roomToBuildOffOf]);
      if (generationResult !== "FAILED_GENERATION") {
        rooms.push(generationResult);
      }
    }
    return rooms;
  }

  fillInRooms(dungeon, roomToFill) {
    console.log(roomToFill);
    for (let i = roomToFill.roomStart[0]; i < roomToFill.roomEnd[0]; i++) {
      for (let j = roomToFill.roomStart[1]; j < roomToFill.roomEnd[1]; j++) {
        dungeon[i][j] = true;
      }
    }
  }

  generateRemainingRooms(lastRoom) {
    let validRoom = false;
    let newRoom;
    let roomStart = [];
    let roomEnd = [];
    let direction = Math.floor(Math.random() * 4);
    while (!validRoom) {
      let roomHeight = Math.floor(3 + Math.random() * 4);
      let roomWidth = Math.floor(3 + Math.random() * 4);

      let offsetWidth = Math.floor(Math.random() * roomWidth);
      let offsetHeight = Math.floor(Math.random() * roomHeight);

      switch (direction) {
        case 0:
          // have to get max of roomstart and roomend coords
          roomStart = [lastRoom.roomStart[0] + 2, lastRoom.roomStart[1] + offsetWidth];
          roomEnd = [roomStart[0] - roomHeight, roomStart[1] + roomWidth];

        case 1:
          roomStart = [lastRoom.roomStart[0] - 2, lastRoom.roomStart[1] + offsetWidth];
          roomEnd = [roomStart[0] + roomHeight, roomStart[1] + roomWidth];

        case 2:
          roomStart = [lastRoom.roomStart[0] + offsetHeight, lastRoom.roomStart[1] + 2];
          roomEnd = [roomStart[0] + roomHeight, roomStart[1] + roomWidth];

        case 3:
          roomStart = [lastRoom.roomStart[0] + offsetHeight, lastRoom.roomStart[1] - 2];
          roomEnd = [roomStart[0] + roomHeight, roomStart[1] - roomWidth];
      }

      newRoom = {
        roomHeight,
        roomWidth,
        roomStart,
        roomEnd
      };

      if (roomStart[0] >= 0 && roomStart[0] <= this.dungeonHeight && roomStart[1] >= 0 && roomStart[1] <= this.dungeonWidth) {
        validRoom = true;
      }
    }

    return newRoom;
  }

  generateFirstRoom() {
    let validRoom = false;

    while (!validRoom) {
      let roomHeight = Math.floor(3 + Math.random() * 4);
      let roomWidth = Math.floor(3 + Math.random() * 4);
      let roomStart = [Math.floor(1 + Math.random() * this.dungeonHeight), Math.floor(1 + Math.random() * this.dungeonWidth)];
      let roomEnd = [roomStart[0] + roomHeight, roomStart[1] + roomWidth];
      console.log(`The room is ${roomHeight} high and ${roomWidth} wide`);
      console.log(`The room begins at ${roomStart} and ends at ${roomEnd}`);
      if (roomStart[0] >= 0 && roomStart[0] <= this.dungeonHeight && roomStart[1] >= 0 && roomStart[1] <= this.dungeonWidth) {
        validRoom = true;
        return {
          roomHeight,
          roomWidth,
          roomStart,
          roomEnd
        };
      }
    }
  }
}
export default DungeonMaster;
