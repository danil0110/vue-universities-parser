import { createStore } from 'vuex';
import universities from '@/store/universitiesModule';

const store = createStore({
  modules: { universities }
});

export default store;
