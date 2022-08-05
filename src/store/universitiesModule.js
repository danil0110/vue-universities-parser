import universitiesService from '@/services/universitiesService';
import { loadFromLS } from '@/components/utilities/localStorage';

const { universities, searchValue, favorites } = loadFromLS();

const universitiesModule = {
  namespaced: true,
  state: {
    status: 'idle',
    universities,
    favorites,
    searchValue
  },
  getters: {
    favoritesCount(state) {
      return state.universities.reduce((total, item) => (state.favorites.includes(item.name) ? total + 1 : total), 0);
    }
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
