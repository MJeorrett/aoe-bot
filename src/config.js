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

export const units = {
  [unitKeys.townCenter]: {
    name: 'Town Center',
    actions: {
      idle: {
        name: 'Idle',
        isContinuous: true,
      },
      createVillager: {
        name: 'Create Villager',
        time: 25,
        food: -50,
        produces: unitKeys.villager,
      },
    }
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
    actions: {
      idle: {
        name: 'Idle',
        isContinuous: true,
      },
      forage: {
        name: 'Forage',
        isContinuous: true,
        food: 0.31,
      },
      lumberjack: {
        name: 'Lumberjack',
        isContinuous: true,
        wood: 0.39,
      },
      mineStone: {
        name: 'Mine Stone',
        isContinuous: true,
        stone: 0.36,
      },
      mineGold: {
        name: 'Mine Gold',
        isContinuous: true,
        gold: 0.38,
      },
      buildTownCenter: {
        name: 'Build Town Center',
        time: 150,
        wood: -275,
        stone: -100,
        produces: unitKeys.townCenter,
      },
      buildHouse: {
        name: 'Build House',
        time: 25,
        wood: -25,
        produces: unitKeys.house,
      },
      buildMill: {
        name: 'Build Mill',
        time: 35,
        wood: -100,
        produces: unitKeys.mill,
      },
      buildFarm: {
        name: 'Build Farm',
        time: 15,
        wood: -60,
        produces: unitKeys.farm,
      },
      buildLumberCamp: {
        name: 'Build Lumber Camp',
        time: 35,
        wood: -100,
        produces: unitKeys.lumberCamp,
      },
      buildMiningCamp: {
        name: 'Build Mining Camp',
        time: 35,
        wood: -100,
        produces: unitKeys.miningCamp,
      },
      buildDock: {
        name: 'Build Dock',
        time: 35,
        wood: -150,
        produces: unitKeys.dock,
      },
      buildBarracks: {
        name: 'Build Barracks',
        time: 50,
        wood: -175,
        produces: unitKeys.barracks,
      },
      buildPalisadeWall: {
        name: 'Build Palisade Wall',
        time: 6,
        wood: -2,
        produces: unitKeys.palisadeWall,
      },
      buildPalisadeGate: {
        name: 'Build Palisade Gate',
        time: 30,
        wood: -30,
        produces: unitKeys.palisadeGate,
      },
      buildOutpost: {
        name: 'Build Outpost',
        time: 15,
        wood: -25,
        stone: 5,
        produces: unitKeys.outpost,
      },
    },
  },
};

export const villagerActions = units.villager.actions;
export const townCenterActions = units.townCenter.actions;
