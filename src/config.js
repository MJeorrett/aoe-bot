// TODO: Change unitKeys -> unitTypes.
export const unitKeys = {
  townCenter: 'townCenter',
  villager: 'villager',
};

// TODO: Change actionKeys -> actionTypes.
export const actionKeys = {
  createVillager: 'createVillager',
  forage: 'forage',
}

export const actions = {
  [actionKeys.createVillager]: {
    key: actionKeys.createVillager,
    name: 'Create Villager',
    time: 25,
    food: 50,
    produces: unitKeys.villager,
  },
  [actionKeys.forage]: {
    key: actionKeys.forage,
    name: 'Forage',
    isContinuous: true,
  }
};

export const units = {
  [unitKeys.townCenter]: {
    key: unitKeys.townCenter,
    name: 'Town Center',
    actions: [
      actionKeys.createVillager,
    ]
  },
  [unitKeys.villager] : {
    key: unitKeys.villager,
    name: 'Villager',
    actions: [
      actionKeys.forage,
    ]
  },
};
