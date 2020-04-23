// TODO: Change unitKeys -> unitTypes.
export const unitKeys = {
  townCenter: 'townCenter',
  barracks: 'barracks',
  villager: 'villager',
};

// TODO: Change actionKeys -> actionTypes.
export const actionKeys = {
  idle: 'idle',
  createVillager: 'createVillager',
  forage: 'forage',
  lumberjack: 'lumberjack',
  buildBarracks: 'buildBarracks',
};

export const actions = {
  [actionKeys.idle]: {
    name: 'Idle',
    isContinuous: true,
  },
  [actionKeys.createVillager]: {
    name: 'Create Villager',
    time: 25,
    food: -50,
    produces: unitKeys.villager,
  },
  [actionKeys.forage]: {
    name: 'Forage',
    isContinuous: true,
    food: 0.31,
  },
  [actionKeys.lumberjack]: {
    name: 'Lumberjack',
    isContinuous: true,
    wood: 0.39,
  },
  [actionKeys.buildBarracks]: {
    name: 'Build Barracks',
    time: 50,
    wood: -175,
    produces: unitKeys.barracks,
  },
};

export const units = {
  [unitKeys.townCenter]: {
    name: 'Town Center',
    actions: [
      actionKeys.idle,
      actionKeys.createVillager,
    ]
  },
  [unitKeys.barracks]: {
    name: 'Barracks',
  },
  [unitKeys.villager]: {
    name: 'Villager',
    actions: [
      actionKeys.idle,
      actionKeys.forage,
      actionKeys.lumberjack,
      actionKeys.buildBarracks,
    ],
  },
};
