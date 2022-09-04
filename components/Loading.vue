<template>
  <div class="loader">
    <div>
      <span class="loader__icon" />
      <p class="loader__title">loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Loading',
    data() {
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  @import '../assets/scss/loading.scss';
</style>
