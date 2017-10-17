const baseState = {
  position: [],
  health: 100,
  maxHealth: 100,
  weapon: 'Dagger',
  weaponDamage: 5,
  exp: 0,
  expNeeded: 100,
  level: 1
}

export var playerReducer = (state = baseState, action) => {
  switch (action.type) {
    case 'ADD_HEALTH':
      let newHealth = action.health + state.health
      let newMaxHealth = newHealth > state.maxHealth ? newHealth : state.maxHealth
      return { ...state, health: newHealth, maxHealth: newMaxHealth }

    case 'REMOVE_HEALTH':
      return { ...state, health: state.health - action.health }
    case 'GAIN_EXP':
      let newExp = action.exp + state.exp
      let newWeaponDamage = state.weaponDamage
      let newExpNeeded = state.expNeeded
      let newLevel = state.level
      if (newExp >= state.expNeeded) {
        newExpNeeded = state.expNeeded + 100
        newExp = newExp - state.expNeeded
        newWeaponDamage = newWeaponDamage + 2
        newLevel++
      }

      return {
        ...state,
        exp: newExp,
        expNeeded: newExpNeeded,
        level: newLevel,
        weaponDamage: newWeaponDamage
      }
    case 'EQUIP_NEW_WEAPON':
      return {
        ...state,
        weapon: action.weapon.weaponName,
        weaponDamage: state.weaponDamage + action.weapon.weaponDamage
      }
    case 'RESET_GAME':
      state = baseState
      return { ...state }

    default:
      return state
  }
}

export var dungeonReducer = (
  state = {
    lights: false,
    info: false,
    gameStatus: 'active',
    currentDungeonLevel: 0,
    enemiesSlain: 0
  },
  action
) => {
  switch (action.type) {
    case 'TOGGLE_INFO':
      return { ...state, info: !state.info }
      case 'TOGGLE_LIGHTS':
      return { ...state, lights: !state.lights }
    case 'UPDATE_STATUS':
      return { ...state, gameStatus: action.status }
    case 'UPDATE_DUNGEON_LEVEL':
      return { ...state, currentDungeonLevel: action.level }
    case 'ENEMY_SLAIN':
      return { ...state, enemiesSlain: state.enemiesSlain + 1 }
    case 'RESET_GAME':
      return { ...state, enemiesSlain: 0 }

    default:
      return state
  }
}
