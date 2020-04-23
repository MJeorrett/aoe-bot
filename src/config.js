const unitNames = {
  townCenter: 'TownCenter',
  villager: 'Villager',
};

const actionNames = {
  createVillager: 'Create Villager',
}

export const actions = [
  {
    name: actionNames.createVillager,
    time: 25,
    food: 50,
    produces: unitNames.villager,
  },
];

export const units = [
  {
    name: unitNames.townCenter,
    actions: [
      actionNames.createVillager,
    ]
  },
  {
    name: unitNames.villager,
  },
];
