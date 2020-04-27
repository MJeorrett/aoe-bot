import { actions, selectors } from './index';

import * as config from '../config';
import { createUnit } from '../models/unit';

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
    it('should remove all traces of the unit', () => {
      const unit = createUnit(config.unitKeys.townCenter);
      store.dispatch(actions.units.add(unit));
      store.dispatch(actions.units.remove(unit.id));

      expect(
        JSON.stringify(store.getState())
      ).not.toContain(unit.id);
    });
  });
});
