export const unitKeys = {
  townCenter: 'townCenter',
  villager: 'villager',
};

export const actionKeys = {
  createVillager: 'createVillager',
}

export const actions = {
  [actionKeys.createVillager]: {
    key: actionKeys.createVillager,
    name: 'Create Villager',
    time: 25,
    food: 50,
    produces: unitKeys.villager,
  },
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
    actions: []
  },
};
