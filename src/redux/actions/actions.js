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
  