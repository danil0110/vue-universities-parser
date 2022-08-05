<template v-else>
  <div v-if="status === 'idle' && !universities.length"></div>
  <SpinnerBlock v-else-if="status === 'loading'" />
  <ErrorMessage text="Error: couldn't send a request 😕" v-else-if="status === 'error'" />
  <ErrorMessage
    text="There are no universities with this name 😕"
    v-else-if="status === 'success' && !universities.length"
  />
  <div v-else>
    <h2>Favorites count: {{ favoritesCount }}</h2>
    <table>
      <tbody>
        <tr>
          <th>#</th>
          <th>Code</th>
          <th>Country</th>
          <th>Name</th>
          <th>Link</th>
          <th>Add to favorites</th>
        </tr>
        <tr v-for="(item, index) of universities" :key="item.country + item.name">
          <td>{{ index + 1 }}</td>
          <td>{{ item.alphaTwoCode }}</td>
          <td>{{ item.country }}</td>
          <td>{{ item.name }}</td>
          <td>
            <a :href="item.webPage" target="_blank"> {{ item.webPage }} </a>
          </td>
          <td>
            <input type="checkbox" :checked="favorites.includes(item.name)" @change="onClickFavorite(item.name)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage';
import SpinnerBlock from '@/components/SpinnerBlock';

export default {
  name: 'UniversitiesTable',
  components: { SpinnerBlock, ErrorMessage },
  methods: {
    ...mapMutations({
      toggleFavorite: 'universities/toggleFavorite'
    }),
    onClickFavorite(universityName) {
      this.toggleFavorite(universityName);
    }
  },
  computed: {
    ...mapState({
      universities: (state) => state.universities.universities,
      favorites: (state) => state.universities.favorites,
      status: (state) => state.universities.status
    }),
    ...mapGetters({
      favoritesCount: 'universities/favoritesCount'
    })
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

h2 {
  text-align: right;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
}

table {
  width: 100%;
  border-spacing: 0;

  tr {
    &:first-child {
      background-color: $main-color;
    }

    &:nth-child(even) {
      background-color: #eee;
    }

    th {
      text-align: center;
      color: white;
      font-weight: 400;
    }

    th,
    td {
      padding: 5px;

      @media (max-width: 768px) {
        font-size: 8px;
      }
    }

    td {
      &:last-child {
        text-align: center;
      }
    }
  }

  a {
    color: $main-color;

    &:visited {
      color: darken($main-color, 15%);
    }
  }

  input[type='checkbox'] {
    accent-color: $main-color;
  }
}
</style>
