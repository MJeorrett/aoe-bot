import { actions, selectors } from './index';

import * as config from '../config';
import constants from '../constants';
import { createAction } from '../models/action';
import { createUnit } from '../models/unit';

describe('actions', () => {
  let store;
  let defaultTownCenterId;
  let defaultVillagerIds;
  let resourcesByTime;

  const getActionById = (id) => selectors.actions.makeSelectActionById()(store.getState(), id);

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

  describe('add', () => {
    let firstAction;

    beforeEach(() => {
      firstAction = createAction(config.actionKeys.createVillager);
      store.dispatch(actions.actions.add(defaultTownCenterId, firstAction));
    });

    it('should add action to action ids for unit', () => {
      expect(
        selectors.actions.makeSelectActionIdsForUnit()(store.getState(), defaultTownCenterId)
      ).toContain(firstAction.id);
    });

    it('should return it by id', () => {
      expect(
        getActionById(firstAction.id)
      ).toEqual(
        expect.objectContaining({
          id: firstAction.id,
        })
      );
    });

    it('should set timeOffset to zero for first action', () => {
      expect(
        getActionById(firstAction.id)
      ).toEqual(
        expect.objectContaining({
          timeOffset: 0,
        })
      );
    });

    it('should set offsetTime of second action to time of previous action', () => {
      const secondAction = createAction(config.actionKeys.createVillager);
      store.dispatch(actions.actions.add(defaultTownCenterId, secondAction));
      expect(
        getActionById(secondAction.id).timeOffset
      ).toEqual(firstAction.time);
    });
  });

  describe('remove', () => {
    let firstAction;

    beforeEach(() => {
      firstAction = createAction(config.actionKeys.createVillager);
      store.dispatch(actions.actions.add(defaultTownCenterId, firstAction));
      store.dispatch(actions.actions.remove(firstAction.id, defaultTownCenterId));
    });

    it('should remove it from unit action ids', () => {
      expect(
        selectors.actions.makeSelectActionIdsForUnit()(store.getState(), defaultTownCenterId)
      ).not.toContain(
        firstAction.id,
      );
    });
  });

  describe('setTime', () => {
    let action1;
    let action2;
    let action3;

    beforeEach(() => {
      createDefaultUnits();
      action1 = { ...createAction(config.actionKeys.forage), time: 10 };
      action2 = { ...createAction(config.actionKeys.forage), time: 20 };
      action3 = { ...createAction(config.actionKeys.forage), time: 30 };

      store.dispatch(actions.actions.add(defaultVillagerIds[0], action1));
      store.dispatch(actions.actions.add(defaultVillagerIds[0], action2));
      store.dispatch(actions.actions.add(defaultVillagerIds[0], action3));
    });

    it('should update offset of following action', () => {
      store.dispatch(actions.actions.setTime(action2.id, defaultVillagerIds[0], 7));

      expect(
        getActionById(action3.id).timeOffset
      ).toEqual(17);
    });

    it('should update offset of following actions', () => {
      store.dispatch(actions.actions.setTime(action1.id, defaultVillagerIds[0], 13));
      expect(
        getActionById(action3.id).timeOffset
      ).toEqual(33);
      expect(
        getActionById(action3.id).timeOffset
      ).toEqual(33);
    });
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
        store.dispatch(actions.actions.setTime(action.id, defaultVillagerIds[0], 17));
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
        store.dispatch(actions.actions.setTime(action.id, defaultVillagerIds[0], 17));
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
        store.dispatch(actions.actions.setTime(action.id, defaultVillagerIds[0], 17));
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
        store.dispatch(actions.actions.setTime(action.id, defaultVillagerIds[0], 17));
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