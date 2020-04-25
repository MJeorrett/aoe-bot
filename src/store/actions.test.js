import { actions, selectors } from './index';

import * as config from '../config';
import constants from '../constants';
import { createAction, createPlaceholderAction } from '../models/action';
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
      store.dispatch(actions.actions.add(defaultTownCenterId, null, firstAction));
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
      store.dispatch(actions.actions.add(defaultTownCenterId, firstAction.id, secondAction));
      expect(
        getActionById(secondAction.id).timeOffset
      ).toEqual(firstAction.time);
    });
  });

  describe('remove', () => {
    let action1;
    let action2;
    let action3;

    beforeEach(() => {
      action1 = createAction(config.actionKeys.createVillager);
      action2 = createAction(config.actionKeys.createVillager);
      action3 = createAction(config.actionKeys.createVillager);
      store.dispatch(actions.actions.add(defaultTownCenterId, null, action1));
      store.dispatch(actions.actions.add(defaultTownCenterId, action1.id, action2));
      store.dispatch(actions.actions.add(defaultTownCenterId, action2.id, action3));
    });

    it('should remove it from unit action ids', () => {
      store.dispatch(actions.actions.remove(action1.id, defaultTownCenterId));
      expect(
        selectors.actions.makeSelectActionIdsForUnit()(store.getState(), defaultTownCenterId)
      ).not.toContain(
        action1.id,
      );
    });

    it('should update timeOffset of subsequent actions', () => {
      store.dispatch(actions.actions.remove(action2.id, defaultTownCenterId));
      expect(
        selectors.actions.makeSelectActionById()(store.getState(), action3.id).timeOffset,
      ).toEqual(
        action1.time
      );
    });
  });

  describe('setTime', () => {
    describe('simple cases', () => {

      let action1;
      let action2;
      let action3;
  
      beforeEach(() => {
        createDefaultUnits();
        action1 = { ...createAction(config.actionKeys.forage), time: 10 };
        action2 = { ...createAction(config.actionKeys.forage), time: 20 };
        action3 = { ...createAction(config.actionKeys.forage), time: 30 };
  
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action1));
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action1.id, action2));
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action2.id, action3));
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
  
      it('should update multiple child action offsets', () => {
        const action2SecondChild = createAction(config.actionKeys.mineStone);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action2.id, action2SecondChild));
        store.dispatch(actions.actions.setTime(action2.id, defaultVillagerIds[0], 7));
  
        expect(
          getActionById(action3.id).timeOffset
        ).toEqual(17);
        expect(
          getActionById(action2SecondChild.id).timeOffset
        ).toEqual(7 + action1.time);
      });
    });

    describe('complex cases', () => {
      it('should update multiple child placeholder actions', () => {
        createDefaultUnits();
        const idleAction = { ...createAction(config.actionKeys.idle), time: 20 };
        const parentAction1 = createAction(config.actionKeys.createVillager);
        const parentAction2 = createAction(config.actionKeys.createVillager);
        const parentAction3 = createAction(config.actionKeys.createVillager);
        const childPlaceholder1 = createPlaceholderAction();
        const childPlaceholder2 = createPlaceholderAction();
        const childPlaceholder3 = createPlaceholderAction();

        store.dispatch(actions.actions.add(defaultTownCenterId, null, idleAction));
        store.dispatch(actions.actions.add(defaultTownCenterId, idleAction.id, parentAction1));
        store.dispatch(actions.actions.add(defaultTownCenterId, parentAction1.id, parentAction2));
        store.dispatch(actions.actions.add(defaultTownCenterId, parentAction2.id, parentAction3));
        store.dispatch(actions.actions.add(defaultTownCenterId, parentAction1.id, childPlaceholder1));
        store.dispatch(actions.actions.add(defaultTownCenterId, parentAction2.id, childPlaceholder2));
        store.dispatch(actions.actions.add(defaultTownCenterId, parentAction3.id, childPlaceholder3));

        store.dispatch(actions.actions.setTime(idleAction.id, defaultTownCenterId, 35));

        resourcesByTime = getResourcesByTime();

        expect(
          getActionById(childPlaceholder1.id).time
        ).toEqual(35 + config.actions.createVillager.time);
        expect(
          getActionById(childPlaceholder2.id).time
        ).toEqual(35 + (config.actions.createVillager.time * 2));
        expect(
          getActionById(childPlaceholder3.id).time
        ).toEqual(35 + (config.actions.createVillager.time * 3));
      });
    });
  });

  describe('continuous action resource increments', () => {
    let action

    describe('food', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(config.actionKeys.forage);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
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
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
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
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
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
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
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
        store.dispatch(actions.actions.add(defaultTownCenterId, null, createAction(config.actionKeys.createVillager)));
      });

      it('should remove resources from time slice 0', () => {
        expect(getResourcesByTime()[0].food).toEqual(constants.startingFood + config.actions.createVillager.food)
      });
    });
    describe('wood', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultTownCenterId, null, createAction(config.actionKeys.buildBarracks)));
      });

      it('should remove resources from time slice 0', () => {
        expect(getResourcesByTime()[0].wood).toEqual(constants.startingWood + config.actions.buildBarracks.wood)
      });
    });
  });
});