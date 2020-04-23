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
    actions: [
      actionKeys.createVillager,
    ]
  },
  [unitKeys.villager] : {

  },
};
