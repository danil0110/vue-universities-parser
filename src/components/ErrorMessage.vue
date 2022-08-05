<template>
  <h2 class="error">{{ text }}</h2>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
}
</style>
