import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import subStore from './modules/sub-store';
export default Vuex.createStore({
  state: {
  },
  mutations,
  actions,
  modules: {
    subStore
  }
});
