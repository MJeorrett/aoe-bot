// TODO: Change unitKeys -> unitTypes.
export const unitKeys = {
  townCenter: 'townCenter',
  house: 'house',
  mill: 'mill',
  farm: 'farm',
  lumberCamp: 'lumberCamp',
  miningCamp: 'miningCamp',
  dock: 'dock',
  barracks: 'barracks',
  palisadeWall: 'palisadeWall',
  palisadeGate: 'palisadeGate',
  outpost: 'outpost',
  villager: 'villager',
};

// TODO: Change actionKeys -> actionTypes.
export const actionKeys = {
  idle: 'idle',
  createVillager: 'createVillager',
  forage: 'forage',
  lumberjack: 'lumberjack',
  buildTownCenter: 'buildTownCenter',
  buildHouse: 'buildHouse',
  buildMill: 'buildMill',
  buildFarm: 'buildFarm',
  buildLumberCamp: 'buildLumberCamp',
  buildMiningCamp: 'buildMiningCamp',
  buildDock: 'buildDock',
  buildBarracks: 'buildBarracks',
  buildPalisadeWall: 'buildPalisadeWall',
  buildPalisadeGate: 'buildPalisadeGate',
  buildOutpost: 'buildOutpost',
  mineStone: 'mineStone',
  mineGold: 'mineGold',
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
  [actionKeys.mineStone]: {
    name: 'Mine Stone',
    isContinuous: true,
    stone: 0.36,
  },
  [actionKeys.mineGold]: {
    name: 'Mine Gold',
    isContinuous: true,
    gold: 0.38,
  },
  [actionKeys.buildTownCenter]: {
    name: 'Build Town Center',
    time: 150,
    wood: -275,
    stone: -100,
    produces: unitKeys.townCenter,
  },
  [actionKeys.buildHouse]: {
    name: 'Build House',
    time: 25,
    wood: -25,
    produces: unitKeys.house,
  },
  [actionKeys.buildMill]: {
    name: 'Build Mill',
    time: 35,
    wood: -100,
    produces: unitKeys.mill,
  },
  [actionKeys.buildFarm]: {
    name: 'Build Farm',
    time: 15,
    wood: -60,
    produces: unitKeys.farm,
  },
  [actionKeys.buildLumberCamp]: {
    name: 'Build Lumber Camp',
    time: 35,
    wood: -100,
    produces: unitKeys.lumberCamp,
  },
  [actionKeys.buildMiningCamp]: {
    name: 'Build Mining Camp',
    time: 35,
    wood: -100,
    produces: unitKeys.miningCamp,
  },
  [actionKeys.buildDock]: {
    name: 'Build Dock',
    time: 35,
    wood: -150,
    produces: unitKeys.dock,
  },
  [actionKeys.buildBarracks]: {
    name: 'Build Barracks',
    time: 50,
    wood: -175,
    produces: unitKeys.barracks,
  },
  [actionKeys.buildPalisadeWall]: {
    name: 'Build Palisade Wall',
    time: 6,
    wood: -2,
    produces: unitKeys.palisadeWall,
  },
  [actionKeys.buildPalisadeGate]: {
    name: 'Build Palisade Gate',
    time: 30,
    wood: -30,
    produces: unitKeys.palisadeGate,
  },
  [actionKeys.buildOutpost]: {
    name: 'Build Outpost',
    time: 15,
    wood: -25,
    stone: 5,
    produces: unitKeys.outpost,
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
  [unitKeys.house]: {
    name: 'House',
  },
  [unitKeys.house]: {
    name: 'House',
  },
  [unitKeys.mill]: {
    name: 'Mill',
  },
  [unitKeys.farm]: {
    name: 'Farm',
  },
  [unitKeys.lumberCamp]: {
    name: 'Lumber Camp',
  },
  [unitKeys.miningCamp]: {
    name: 'Mining Camp',
  },
  [unitKeys.dock]: {
    name: 'Dock',
  },
  [unitKeys.barracks]: {
    name: 'Barracks',
  },
  [unitKeys.palisadeWall]: {
    name: 'Palisade Wall',
  },
  [unitKeys.palisadeGate]: {
    name: 'Palisade Gate',
  },
  [unitKeys.outpost]: {
    name: 'Outpost',
  },
  [unitKeys.villager]: {
    name: 'Villager',
    actions: [
      actionKeys.idle,
      actionKeys.forage,
      actionKeys.lumberjack,
      actionKeys.mineStone,
      actionKeys.mineGold,
      actionKeys.buildTownCenter,
      actionKeys.buildHouse,
      actionKeys.buildMill,
      actionKeys.buildFarm,
      actionKeys.buildLumberCamp,
      actionKeys.buildMiningCamp,
      actionKeys.buildDock,
      actionKeys.buildBarracks,
      actionKeys.buildPalisadeWall,
      actionKeys.buildPalisadeGate,
      actionKeys.buildOutpost,
    ],
  },
};
