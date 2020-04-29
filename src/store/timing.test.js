import { createAction } from '../models/action';
import { unitKeys, townCenterActions } from '../config';

import { actions, selectors } from './index';
import { createUnit } from '../models/unit';

describe('timing', () => {
  let store;

  const selectTimingForAction = actionId => {
    return selectors.timing.makeSelectOffsetAndDurationForAction()(store.getState(), actionId);
  }

  beforeEach(() => {
    jest.resetModules();
    store = require('../store').default;
  });

  describe('bugs', () => {
    it('https://trello.com/c/mHQICagH/34-deletion-timing-update-bug', () => {
      const townCenter = createUnit(unitKeys.townCenter);
      const action1 = createAction(townCenterActions.idle);
      const action2 = createAction(townCenterActions.idle);
      const action3 = createAction(townCenterActions.createVillager);
      const action4 = createAction(townCenterActions.createVillager);

      store.dispatch(actions.units.add(townCenter, null));
      store.dispatch(actions.actions.add(townCenter.id, null, action1));
      store.dispatch(actions.actions.add(townCenter.id, action1.id, action2));
      store.dispatch(actions.actions.add(townCenter.id, action2.id, action3));
      store.dispatch(actions.actions.add(townCenter.id, action3.id, action4));

      store.dispatch(actions.actions.remove(action2.id, townCenter.id));
      store.dispatch(actions.actions.remove(action1.id, townCenter.id));

      expect(selectTimingForAction(action3.id).timeOffset)
        .toEqual(0);
      expect(selectTimingForAction(action4.id).timeOffset)
        .toEqual(townCenterActions.createVillager.time);
    });
  });
});