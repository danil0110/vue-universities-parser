<template>
  <form ref="form" @submit.prevent="onSubmit" @reset="onReset">
    <div class="input-wrapper">
      <input v-model.trim="inputValue" @input="validate" type="text" placeholder="Enter country..." />
      <span v-if="!valid" class="error">Country is required!</span>
    </div>
    <div class="button-group">
      <button class="submit" :disabled="!valid">Search</button>
      <button type="reset">Reset</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { clearLS } from '@/components/utilities/localStorage';

export default {
  name: 'SearchForm',
  computed: {
    ...mapState({
      searchValue: (state) => state.universities.searchValue,
      universities: (state) => state.universities.universities,
      status: (state) => state.universities.status
    })
  },
  data: () => ({
    inputValue: '',
    valid: true,
    submitted: false
  }),
  methods: {
    ...mapActions({
      fetchUniversities: 'universities/fetchUniversities'
    }),
    ...mapMutations({
      resetUniversities: 'universities/resetUniversities'
    }),
    validate() {
      if (!this.submitted) return;
      if (!this.inputValue.length) {
        return (this.valid = false);
      } else {
        this.valid = true;
      }
    },
    onSubmit() {
      this.submitted = true;
      this.validate();

      if (this.valid) this.fetchUniversities(this.inputValue);
    },
    onReset() {
      clearLS();
      this.resetUniversities();
      this.$refs.form.reset();
      this.inputValue = '';
      this.valid = true;
      this.submitted = false;
    }
  },
  mounted() {
    this.inputValue = this.searchValue;
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

form {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 30px;

  @media (max-width: 420px) {
    flex-direction: column;
    gap: 25px;
  }

  .input-wrapper {
    position: relative;

    input {
      padding: 10px 20px;
      font-size: 16px;
      outline: none;
      border: 1px solid #aaa;
      border-radius: 5px;
      transition: 0.3s all;

      &:hover {
        border-color: #777;
      }

      &:focus {
        border-color: $main-color;
      }
    }

    .error {
      position: absolute;
      left: 0;
      bottom: -20px;
      color: red;
    }
  }

  .button-group {
    display: flex;
    gap: 5px;

    button {
      border: none;
      border-radius: 5px;
      font-size: 16px;
      padding: 10px 20px;
      cursor: pointer;
      background-color: #ccc;
      color: black;

      &:hover {
        background-color: lighten(#ccc, 10%);
      }

      &:active {
        background-color: lighten(#ccc, 15%);
      }

      &.submit {
        background-color: $main-color;
        color: white;

        &:hover {
          background-color: lighten($main-color, 10%);
        }

        &:active {
          background-color: lighten($main-color, 20%);
        }
      }

      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
}
</style>
