<template>
  <main>
    <div class="tw-flex">
      <figure>
        <img :alt="detail.image.template" :src="detail.image.url" />
      </figure>
      <div>
        <h1>{{ detail.title }}</h1>
        <p>{{ detail.description }}</p>
      </div>
    </div>
    <nuxt-link to="/episode/1">Episode</nuxt-link>
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'HomePage',
    computed: {
      detail() {
        return this.$store.state.detail;
      },
    },
  });
</script>
