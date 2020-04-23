// TODO: Change unitKeys -> unitTypes.
export const unitKeys = {
  townCenter: 'townCenter',
  villager: 'villager',
};

// TODO: Change actionKeys -> actionTypes.
const actionKeys = {
  idle: 'idle',
  createVillager: 'createVillager',
  forage: 'forage',
};

export const actions = {
  [actionKeys.idle]: {
    name: 'Idle',
    isContinuous: true,
  },
  [actionKeys.createVillager]: {
    name: 'Create Villager',
    time: 25,
    food: 50,
    produces: unitKeys.villager,
  },
  [actionKeys.forage]: {
    name: 'Forage',
    isContinuous: true,
  }
};

export const units = {
  [unitKeys.townCenter]: {
    key: unitKeys.townCenter,
    name: 'Town Center',
    actions: [
      actionKeys.idle,
      actionKeys.createVillager,
    ]
  },
  [unitKeys.villager] : {
    key: unitKeys.villager,
    name: 'Villager',
    actions: [
      actionKeys.idle,
      actionKeys.forage,
    ]
  },
};
