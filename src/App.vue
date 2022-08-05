<template>
  <div class="app">
    <div class="container">
      <h1>Universities Parser 🎓</h1>
      <SearchForm />
    </div>
  </div>
</template>

<script>
import SearchForm from '@/components/SearchForm';
export default {
  name: 'App',
  components: { SearchForm }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
}

h1 {
  margin: 20px 0;
  text-align: center;
  font-weight: 700;

  @media (max-width: 375px) {
    font-size: 26px;
  }
}

.container {
  margin: 0 auto;
  padding: 0 10px;
  width: 1140px;

  @media (max-width: 1200px) {
    width: 960px;
  }

  @media (max-width: 992px) {
    width: 720px;
  }

  @media (max-width: 768px) {
    width: 540px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
}
</style>
