import universitiesService from '@/services/universitiesService';

const universitiesModule = {
  namespaced: true,
  state: {
    status: 'idle',
    universities: [],
    favorites: [],
    searchValue: ''
  },
  mutations: {
    setSearchValue(state, payload) {
      state.searchValue = payload;
    },
    setUniversities(state, payload) {
      state.universities = payload;
    },
    setStatus(state, payload) {
      state.status = payload;
    },
    resetUniversities(state) {
      state.status = 'idle';
      state.universities = [];
      state.searchValue = '';
    },
    toggleFavorite(state, payload) {
      const universityName = state.favorites.find((name) => name === payload);

      if (universityName) {
        state.favorites = state.favorites.filter((name) => name !== universityName);
      } else {
        state.favorites.push(payload);
      }
    }
  },
  actions: {
    async fetchUniversities({ commit }, searchValue) {
      commit('setStatus', 'loading');

      try {
        const data = await universitiesService.getUniversitiesByCountry(searchValue);
        commit('setStatus', 'success');
        commit('setUniversities', data);
        commit('setSearchValue', searchValue);
      } catch (err) {
        commit('setStatus', 'error');
        commit('setUniversities', []);
        commit('setSearchValue', '');
      }
    }
  }
};

export default universitiesModule;
