// TODO: Change unitKeys -> unitTypes.
export const unitKeys = {
  villager: 'villager',
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
  archeryRange: 'archeryRange',
  stable: 'stable',
  market: 'market',
  blacksmith: 'blacksmith',
};

const researchActionKeys = {
  advanceToFeudalAge: 'advanceToFeudalAge',
  advanceToCastleAge: 'advanceToCastleAge',
  advanceToImperialAge: 'advanceToImperialAge',
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
      [researchActionKeys.advanceToFeudalAge]: {
        name: 'Advance to Feudal Age',
        key: researchActionKeys.advanceToFeudalAge,
        time: 130,
        food: -500,
        isResearch: true,
        prerequisiteBuildings: {
          keys: [
            unitKeys.barracks,
            unitKeys.mill,
            unitKeys.lumberCamp,
            unitKeys.miningCamp,
            unitKeys.dock,
          ],
          count: 2,
        },
      },
      [researchActionKeys.advanceToCastleAge]: {
        name: 'Advance to Castle Age',
        key: researchActionKeys.advanceToCastleAge,
        time: 160,
        food: 800,
        gold: 200,
        isResearch: true,
        prerequisiteBuildings: {
          keys: [
            unitKeys.archeryRange,
            unitKeys.stable,
            unitKeys.market,
            unitKeys.blacksmith,
          ],
          count: 2,
        },
        prerequisiteResearch: researchActionKeys.advanceToFeudalAge,
      },
      [researchActionKeys.advanceToImperialAge]: {
        name: 'Advance to Imperial Age',
        key: researchActionKeys.advanceToImperialAge,
        time: 190,
        food: 1000,
        gold: 800,
        isResearch: true,
        prerequisiteResearch: researchActionKeys.advanceToCastleAge,
      },
    },
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
  [unitKeys.archeryRange]: {
    name: 'Archery Range',
  },
  [unitKeys.stable]: {
    name: 'Stable',
  },
  [unitKeys.market]: {
    name: 'Market',
  },
  [unitKeys.blacksmith]: {
    name: 'Blacksmith',
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
      buildArcheryRange: {
        name: 'Build Archery Range',
        time: 50,
        wood: -175,
        prerequisiteBuildings: {
          keys: [unitKeys.barracks],
          count: 1,
        },
        prerequisiteResearch: researchActionKeys.advanceToFeudalAge,
        produces: unitKeys.archeryRange,
      },
      buildStables: {
        name: 'Build Stables',
        time: 50,
        wood: -175,
        prerequisiteBuildings: {
          keys: [unitKeys.barracks],
          count: 1,
        },
        prerequisiteResearch: researchActionKeys.advanceToFeudalAge,
        produces: unitKeys.stable,
      },
      buildMarket: {
        name: 'Build Market',
        time: 60,
        wood: -175,
        prerequisiteBuildings: {
          keys: [unitKeys.mill],
          count: 1,
        },
        prerequisiteResearch: researchActionKeys.advanceToFeudalAge,
        produces: unitKeys.market,
      },
      buildBlacksmith: {
        name: 'Build Blacksmith',
        time: 40,
        wood: -150,
        prerequisiteResearch: researchActionKeys.advanceToFeudalAge,
        produces: unitKeys.blacksmith,
      },
    },
  },
};

export const villagerActions = units.villager.actions;
export const townCenterActions = units.townCenter.actions;
