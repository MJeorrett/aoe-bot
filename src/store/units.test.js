import { actions, selectors } from './index';

import * as config from '../config';
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
      const unit = createUnit(config.unitKeys.townCenter);
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
    let unit1;
    beforeEach(() => {
      unit1 = createUnit(config.unitKeys.townCenter);
      store.dispatch(actions.units.add(unit1));
    });
    it('should remove all traces of the unit', () => {
      store.dispatch(actions.units.remove(unit1.id));

      expect(JSON.stringify(store.getState()))
        .not.toContain(unit1.id);
    });
    it('should remove child actions and units', () => {
      const rootAction1 = createAction(config.actionKeys.idle);
      const rootAction2 = createAction(config.actionKeys.idle);
      const childAction1 = createAction(config.actionKeys.createVillager);
      const childUnit1 = createUnit(config.unitKeys.villager);
      const childAction2 = createAction(config.actionKeys.forage);
      const childAction3 = createAction(config.actionKeys.forage);

      store.dispatch(actions.actions.add(unit1.id, null, childAction1));
      store.dispatch(actions.actions.add(unit1.id, childAction1.id, rootAction1));
      store.dispatch(actions.units.add(childUnit1, rootAction1.id, rootAction2));
      store.dispatch(actions.actions.add(childUnit1.id, null, childAction2));
      store.dispatch(actions.actions.add(childUnit1.id, childAction2.id, childAction3));

      store.dispatch(actions.units.remove(unit1.id));

      const stateJson = JSON.stringify(store.getState());

      expect(stateJson).not.toContain(rootAction1.id);
      expect(stateJson).not.toContain(rootAction2.id);
      expect(stateJson).not.toContain(childAction1.id);
      expect(stateJson).not.toContain(childAction2.id);
      expect(stateJson).not.toContain(childAction3.id);
      expect(stateJson).not.toContain(childUnit1.id);
    });
  });
});
