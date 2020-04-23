import { actions } from './store';
import * as config from './config';
import { createUnit } from './models/unit';

const seedStore = store => {
  store.dispatch(actions.units.add(createUnit(config.unitKeys.townCenter)));
  store.dispatch(actions.units.add(createUnit(config.unitKeys.villager)));
  store.dispatch(actions.units.add(createUnit(config.unitKeys.villager)));
  store.dispatch(actions.units.add(createUnit(config.unitKeys.villager)));
};

export default seedStore;
