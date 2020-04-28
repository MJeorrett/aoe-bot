import { actions, selectors } from './index';

import { unitKeys, townCenterActions, villagerActions } from '../config';
import { createUnit } from '../models/unit';
import { createAction } from '../models/action';

describe('units', () => {
  let store;

  beforeEach(() => {
    jest.resetModules();
    store = require('../store').default;
  });

  describe('add', () => {
    it('should return unit by id', () => {
      const unit = createUnit(unitKeys.townCenter);
      store.dispatch(actions.units.add(unit));

      expect(
        selectors.units.makeSelectById()(store.getState(), unit.id)
      ).toEqual(
        expect.objectContaining({
          id: unit.id,
        })
      );
    });
  });

  describe('remove', () => {
    let townCenter;
    beforeEach(() => {
      townCenter = createUnit(unitKeys.townCenter);
      store.dispatch(actions.units.add(townCenter));
    });
    it('should remove all traces of the unit', () => {
      store.dispatch(actions.units.remove(townCenter.id));

      expect(JSON.stringify(store.getState()))
        .not.toContain(townCenter.id);
    });
    it('should remove child actions and units', () => {
      const townCenterAction1 = createAction(townCenterActions.idle);
      const townCenterAction2 = createAction(townCenterActions.idle);
      const townCenterAction3 = createAction(townCenterActions.createVillager);
      const childUnit = createUnit(unitKeys.villager);
      const childUnitAction1 = createAction(villagerActions.forage);
      const childUnitAction2 = createAction(villagerActions.forage);

      store.dispatch(actions.actions.add(townCenter.id, null, townCenterAction3));
      store.dispatch(actions.actions.add(townCenter.id, townCenterAction3.id, townCenterAction1));
      store.dispatch(actions.units.add(childUnit, townCenterAction1.id, townCenterAction2));
      store.dispatch(actions.actions.add(childUnit.id, null, childUnitAction1));
      store.dispatch(actions.actions.add(childUnit.id, childUnitAction1.id, childUnitAction2));

      store.dispatch(actions.units.remove(townCenter.id));

      const stateJson = JSON.stringify(store.getState());

      expect(stateJson).not.toContain(townCenterAction1.id);
      expect(stateJson).not.toContain(townCenterAction2.id);
      expect(stateJson).not.toContain(townCenterAction3.id);
      expect(stateJson).not.toContain(childUnitAction1.id);
      expect(stateJson).not.toContain(childUnitAction2.id);
      expect(stateJson).not.toContain(childUnit.id);
    });
  });
});
