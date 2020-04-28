import { actions, selectors } from './index';

import { unitKeys, townCenterActions, villagerActions } from '../config';
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
    const townCenter = createUnit(unitKeys.townCenter, 'default-towncenter');
    const villagers = [
      createUnit(unitKeys.villager, 'default-villager-1'),
      createUnit(unitKeys.villager, 'default-villager-1'),
      createUnit(unitKeys.villager, 'default-villager-1'),
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
      createDefaultUnits();
      firstAction = createAction(townCenterActions.createVillager);
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
      const secondAction = createAction(townCenterActions.createVillager);
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
      createDefaultUnits();
      action1 = createAction(townCenterActions.createVillager, 'action1');
      action2 = createAction(townCenterActions.createVillager, 'action2');
      action3 = createAction(townCenterActions.createVillager, 'action3');
      store.dispatch(actions.actions.add(defaultTownCenterId, null, action1));
      store.dispatch(actions.actions.add(defaultTownCenterId, action1.id, action2));
      store.dispatch(actions.actions.add(defaultTownCenterId, action2.id, action3));
    });

    it('should remove it from unit action ids', () => {
      store.dispatch(actions.actions.remove(action1.id));
      expect(
        selectors.actions.makeSelectActionIdsForUnit()(store.getState(), defaultTownCenterId)
      ).not.toContain(
        action1.id,
      );
    });

    it('should update timeOffset of subsequent actions', () => {
      store.dispatch(actions.actions.remove(action2.id));
      expect(
        getActionById(action3.id).timeOffset,
      ).toEqual(
        action1.time
      );
    });

    it('should remove all traces of action', () => {
      store.dispatch(actions.actions.remove(action1.id));
      expect(
        JSON.stringify(store.getState())
      ).not.toContain(
        action1.id
      );
    });

    it('should remove child units and their actions', () => {
      const childUnit = createUnit(unitKeys.townCenter);
      const childUnitChildAction = createAction(townCenterActions.createVillager);

      store.dispatch(actions.units.add(childUnit, action1.id));
      store.dispatch(actions.actions.add(childUnit.id, null, childUnitChildAction));
      store.dispatch(actions.actions.remove(action1.id));

      const stateJson = JSON.stringify(store.getState());

      expect(stateJson).not.toContain(childUnit.id);
      expect(stateJson).not.toContain(childUnitChildAction.id);
    });
  });

  // TODO: move to timing.test.js
  describe('setTime', () => {
    describe('simple cases', () => {

      let action1;
      let action2;
      let action3;

      beforeEach(() => {
        createDefaultUnits();
        action1 = { ...createAction(villagerActions.forage), time: 10 };
        action2 = { ...createAction(villagerActions.forage), time: 20 };
        action3 = { ...createAction(villagerActions.forage), time: 30 };

        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action1));
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action1.id, action2));
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action2.id, action3));
      });

      it('should update offset of following action', () => {
        store.dispatch(actions.actions.setTime(action2.id, 7));

        expect(
          getActionById(action3.id).timeOffset
        ).toEqual(17);
      });

      it('should update offset of following actions', () => {
        store.dispatch(actions.actions.setTime(action1.id, 13));
        expect(
          getActionById(action3.id).timeOffset
        ).toEqual(33);
        expect(
          getActionById(action3.id).timeOffset
        ).toEqual(33);
      });

      it('should update multiple child action offsets', () => {
        const action2SecondChild = createAction(villagerActions.mineStone);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], action2.id, action2SecondChild));
        store.dispatch(actions.actions.setTime(action2.id, 7));

        expect(
          getActionById(action3.id).timeOffset
        ).toEqual(17);
        expect(
          getActionById(action2SecondChild.id).timeOffset
        ).toEqual(7 + action1.time);
      });
    });

    describe('complex cases', () => {
      it('should update multiple child actions', () => {
        createDefaultUnits();
        const idleAction = { ...createAction(townCenterActions.idle), time: 20, id: 'idle-action' };
        const createVillagerRoot1 = createAction(townCenterActions.createVillager, 'create-villager-root-1');
        const createVillagerRoot2 = createAction(townCenterActions.createVillager, 'create-villager-root-2');
        const createVillagerRoot3 = createAction(townCenterActions.createVillager, 'create-villager-root-3');
        const childVillager = createUnit(unitKeys.villager, 'child-villager');
        const childVillagerForage = createAction(villagerActions.forage, 'child-villager-forage');

        store.dispatch(actions.actions.add(defaultTownCenterId, null, idleAction));
        store.dispatch(actions.actions.add(defaultTownCenterId, idleAction.id, createVillagerRoot1));
        store.dispatch(actions.actions.add(defaultTownCenterId, createVillagerRoot1.id, createVillagerRoot2));
        store.dispatch(actions.actions.add(defaultTownCenterId, createVillagerRoot2.id, createVillagerRoot3));
        store.dispatch(actions.units.add(childVillager, createVillagerRoot1.id));
        store.dispatch(actions.actions.add(childVillager.id, null, childVillagerForage));

        store.dispatch(actions.actions.setTime(idleAction.id, 35));

        resourcesByTime = getResourcesByTime();

        expect(getActionById(createVillagerRoot1.id).timeOffset)
          .toEqual(35);
        expect(getActionById(createVillagerRoot2.id).timeOffset)
          .toEqual(35 + townCenterActions.createVillager.time);
        expect(getActionById(createVillagerRoot3.id).timeOffset)
          .toEqual(35 + (townCenterActions.createVillager.time * 2));

        expect(getActionById(childVillagerForage.id).timeOffset)
          .toEqual(35 + townCenterActions.createVillager.time);
      });
    });
  });

  // TODO: move this to selectResourceByTime.test.js
  describe('continuous action resource increments', () => {
    let action

    describe('food', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(villagerActions.forage);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
        resourcesByTime = getResourcesByTime();
      });

      it('should return initial food for time slice 0', () => {
        expect(resourcesByTime[0].food).toEqual(constants.startingFood);
      });

      it('should add food to time slice 1', () => {
        expect(resourcesByTime[1].food).toEqual(constants.startingFood + villagerActions.forage.food);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].food).toBeCloseTo(constants.startingFood + (villagerActions.forage.food * 16));
        expect(resourcesByTime[17].food).toBeCloseTo(constants.startingFood + (villagerActions.forage.food * 17));
        expect(resourcesByTime[18].food).toBeCloseTo(constants.startingFood + (villagerActions.forage.food * 17));
      });
    });

    describe('wood', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(villagerActions.lumberjack);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
        resourcesByTime = getResourcesByTime();
      });

      it('should return initial wood for time slice 0', () => {
        expect(resourcesByTime[0].wood).toEqual(constants.startingWood);
      });

      it('should add wood to time slice 1', () => {
        expect(resourcesByTime[1].wood).toEqual(constants.startingWood + villagerActions.lumberjack.wood);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].wood).toBeCloseTo(constants.startingWood + (villagerActions.lumberjack.wood * 16));
        expect(resourcesByTime[17].wood).toBeCloseTo(constants.startingWood + (villagerActions.lumberjack.wood * 17));
        expect(resourcesByTime[18].wood).toBeCloseTo(constants.startingWood + (villagerActions.lumberjack.wood * 17));
      });
    });

    describe('stone', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(villagerActions.mineStone);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
        resourcesByTime = getResourcesByTime();
      });

      it('should return initial stone for time slice 0', () => {
        expect(resourcesByTime[0].stone).toEqual(constants.startingStone);
      });

      it('should add stone to time slice 1', () => {
        expect(resourcesByTime[1].stone).toEqual(constants.startingStone + villagerActions.mineStone.stone);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].stone).toBeCloseTo(constants.startingStone + (villagerActions.mineStone.stone * 16));
        expect(resourcesByTime[17].stone).toBeCloseTo(constants.startingStone + (villagerActions.mineStone.stone * 17));
        expect(resourcesByTime[18].stone).toBeCloseTo(constants.startingStone + (villagerActions.mineStone.stone * 17));
      });
    });

    describe('gold', () => {
      beforeEach(() => {
        createDefaultUnits();
        action = createAction(villagerActions.mineGold);
        store.dispatch(actions.actions.add(defaultVillagerIds[0], null, action));
        resourcesByTime = getResourcesByTime();
      });

      it('should return initial gold for time slice 0', () => {
        expect(resourcesByTime[0].gold).toEqual(constants.startingGold);
      });

      it('should add gold to time slice 1', () => {
        expect(resourcesByTime[1].gold).toEqual(constants.startingGold + villagerActions.mineGold.gold);
      });

      it('should stop incrementing when action ends', () => {
        store.dispatch(actions.actions.setTime(action.id, 17));
        resourcesByTime = getResourcesByTime();
        expect(resourcesByTime[16].gold).toBeCloseTo(constants.startingGold + (villagerActions.mineGold.gold * 16));
        expect(resourcesByTime[17].gold).toBeCloseTo(constants.startingGold + (villagerActions.mineGold.gold * 17));
        expect(resourcesByTime[18].gold).toBeCloseTo(constants.startingGold + (villagerActions.mineGold.gold * 17));
      });
    });
  });

  describe('instant action resource increments', () => {
    describe('food', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultTownCenterId, null, createAction(townCenterActions.createVillager)));
      });

      it('should remove resources from time slice 0', () => {
        expect(getResourcesByTime()[0].food).toEqual(constants.startingFood + townCenterActions.createVillager.food)
      });
    });
    describe('wood', () => {
      beforeEach(() => {
        createDefaultUnits();
        store.dispatch(actions.actions.add(defaultTownCenterId, null, createAction(villagerActions.buildBarracks)));
      });

      it('should remove resources from time slice 0', () => {
        expect(getResourcesByTime()[0].wood).toEqual(constants.startingWood + villagerActions.buildBarracks.wood)
      });
    });
  });
});