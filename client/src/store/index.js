import { createStore } from 'vuex';

import facilityModule from './modules/facility/index';
import schedulesModule from './modules/schedules/index';

export default createStore({
  modules: {
    facility: facilityModule,
    schedules: schedulesModule,
  },
});
