export var playerReducer = (
  state = {
    position: [],
    health: 100,
    maxHealth: 100,
    weapon: 'a Herring!',
    weaponDamage: 5,
    exp: 0,
    expNeeded: 100,
    level: 1
  },
  action
) => {
  switch (action.type) {
    case 'ADD_HEALTH':
      let newHealth = action.health + state.health
      let newMaxHealth = newHealth > state.maxHealth ? newHealth : state.maxHealth
      return { ...state, health: newHealth, maxHealth: newMaxHealth }

    case 'REMOVE_HEALTH':
      return { ...state, health: state.health - action.health }
    case 'GAIN_EXP':
      return { ...state, exp: state.exp - action.exp }
    case 'EQUIP_NEW_WEAPON':
      return { ...state, weapon: action.weapon.weaponName, weaponDamage: state.weaponDamage + action.weapon.weaponDamage }

    default:
      return state
  }
}
