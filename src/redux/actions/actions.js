export var equipNewWeapon = weapon => {
  return {
    type: 'EQUIP_NEW_WEAPON',
    weapon
  }
}

export var addHealth = health => {
  return {
    type: 'ADD_HEALTH',
    health
  }
}

export var removeHealth = health => {
  return {
    type: 'REMOVE_HEALTH',
    health
  }
}

export var gainExp = exp => {
  return {
    type: 'GAIN_EXP',
    exp
  }
}
export var enemySlain = () => {
  return {
    type: 'ENEMY_SLAIN'

  }
}

export var toggleLights = () => {
  return {
    type: 'TOGGLE_LIGHTS'
  }
}

export var toggleInfo = () => {
  return {
    type: 'TOGGLE_INFO'
  }
}

export var updateGameStatus = status => {
  return {
    type: 'UPDATE_STATUS',
    status
  }
}

export var updateDungeonLevel = (level) => {
  return {
    type: 'UPDATE_DUNGEON_LEVEL',
    level

  }
}

export var resetGame = () => {
  return {
    type: 'RESET_GAME'
  }
}
