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
  
  describe('continuous action rresource increments', () => {
    const action = createAction(config.actionKeys.forage);

    describe('food', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial food for time slice 0', () => {
        expect(resourcesByTime[0].food).toEqual(constants.startingFood);
      });
  
      it('should add food to time slice 1', () => {
        expect(resourcesByTime[1].food).toEqual(constants.startingFood + config.actions.forage.food);
      });
    });

    describe('wood', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultVillagerIds[0], createAction(config.actionKeys.lumberjack)));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial wood for time slice 0', () => {
        expect(resourcesByTime[0].wood).toEqual(constants.startingWood);
      });
  
      it('should add wood to time slice 1', () => {
        expect(resourcesByTime[1].wood).toEqual(constants.startingWood + config.actions.lumberjack.wood);
      });
    });
  
    describe('stone', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultVillagerIds[0], createAction(config.actionKeys.mineStone)));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial stone for time slice 0', () => {
        expect(resourcesByTime[0].stone).toEqual(constants.startingStone);
      });
  
      it('should add stone to time slice 1', () => {
        expect(resourcesByTime[1].stone).toEqual(constants.startingStone + config.actions.mineStone.stone);
      });
    });
  
    describe('gold', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultVillagerIds[0], createAction(config.actionKeys.mineGold)));
        resourcesByTime = getResourcesByTime();
      });
  
      it('should return initial gold for time slice 0', () => {
        expect(resourcesByTime[0].gold).toEqual(constants.startingGold);
      });
  
      it('should add gold to time slice 1', () => {
        expect(resourcesByTime[1].gold).toEqual(constants.startingGold + config.actions.mineGold.gold);
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