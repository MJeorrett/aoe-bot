import { actions, selectors } from './index';

import * as config from '../config';
import constants from '../constants';
import { createAction } from '../models/action';
import { createUnit } from '../models/unit';

describe('index', () => {
  let store;
  let defaultTownCenterId;
  let defaultVillagerIds;
  let resourcesByTime;

  const createDefaultUnits = () => {
    const townCenter = createUnit(config.unitKeys.townCenter);
    const villagers = [
      createUnit(config.unitKeys.villager),
      createUnit(config.unitKeys.villager),
      createUnit(config.unitKeys.villager),
    ];

    store.dispatch(actions.units.add(townCenter))
    villagers.forEach(villager => store.dispatch(actions.units.add(villager)));
    
    defaultTownCenterId = townCenter.id;
    defaultVillagerIds = villagers.map(villager => villager.id);
  };

  const getResourcesByTime = () => {
    return selectors.meta.resourcesByTime(store.getState());
  }

  beforeEach(() => {
    jest.resetModules();
    store = require('../store').default;
  });
  
  describe('continuous action resource increments', () => {
    let action

    describe('food', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(config.actionKeys.forage);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial food for time slice 0', () => {
        expect(resourcesByTime[0].food).toEqual(constants.startingFood);
      });
  
      it('should add food to time slice 1', () => {
        expect(resourcesByTime[1].food).toEqual(constants.startingFood + config.actions.forage.food);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].food).toBeCloseTo(constants.startingFood + (config.actions.forage.food * 16));
        expect(resourcesByTime[17].food).toBeCloseTo(constants.startingFood + (config.actions.forage.food * 17));
        expect(resourcesByTime[18].food).toBeCloseTo(constants.startingFood + (config.actions.forage.food * 17));
      });
    });

    describe('wood', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(config.actionKeys.lumberjack);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial wood for time slice 0', () => {
        expect(resourcesByTime[0].wood).toEqual(constants.startingWood);
      });
  
      it('should add wood to time slice 1', () => {
        expect(resourcesByTime[1].wood).toEqual(constants.startingWood + config.actions.lumberjack.wood);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].wood).toBeCloseTo(constants.startingWood + (config.actions.lumberjack.wood * 16));
        expect(resourcesByTime[17].wood).toBeCloseTo(constants.startingWood + (config.actions.lumberjack.wood * 17));
        expect(resourcesByTime[18].wood).toBeCloseTo(constants.startingWood + (config.actions.lumberjack.wood * 17));
      });
    });
  
    describe('stone', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(config.actionKeys.mineStone);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial stone for time slice 0', () => {
        expect(resourcesByTime[0].stone).toEqual(constants.startingStone);
      });
  
      it('should add stone to time slice 1', () => {
        expect(resourcesByTime[1].stone).toEqual(constants.startingStone + config.actions.mineStone.stone);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].stone).toBeCloseTo(constants.startingStone + (config.actions.mineStone.stone * 16));
        expect(resourcesByTime[17].stone).toBeCloseTo(constants.startingStone + (config.actions.mineStone.stone * 17));
        expect(resourcesByTime[18].stone).toBeCloseTo(constants.startingStone + (config.actions.mineStone.stone * 17));
      });
    });
  
    describe('gold', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(config.actionKeys.mineGold);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial gold for time slice 0', () => {
        expect(resourcesByTime[0].gold).toEqual(constants.startingGold);
      });
  
      it('should add gold to time slice 1', () => {
        expect(resourcesByTime[1].gold).toEqual(constants.startingGold + config.actions.mineGold.gold);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].gold).toBeCloseTo(constants.startingGold + (config.actions.mineGold.gold * 16));
        expect(resourcesByTime[17].gold).toBeCloseTo(constants.startingGold + (config.actions.mineGold.gold * 17));
        expect(resourcesByTime[18].gold).toBeCloseTo(constants.startingGold + (config.actions.mineGold.gold * 17));
      });
    });
  });

  describe('instant action resource increments', () => {
    describe('food', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultTownCenterId, createAction(config.actionKeys.createVillager)));
      });
  
      it('should remove resources from time slice 0', () => {
        expect(getResourcesByTime()[0].food).toEqual(constants.startingFood + config.actions.createVillager.food)
      });
    });
    describe('wood', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultTownCenterId, createAction(config.actionKeys.buildBarracks)));
      });
  
      it('should remove resources from time slice 0', () => {
        expect(getResourcesByTime()[0].wood).toEqual(constants.startingWood + config.actions.buildBarracks.wood)
      });
    });
  });
});