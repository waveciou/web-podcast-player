<template>
  <div>
    <div>{{ index }}</div>
    <div>{{ title }}</div>
    <div>{{ description }}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'EpisodePage',
    data() {
      return {
        index: -1,
      };
    },
    computed: {
      title() {
        return this.$store.state.episode[this.index]?.title || '';
      },
      description() {
        return this.$store.state.episode[this.index]?.description || '';
      },
      episode() {
        return this.$store.state.episode;
      },
    },
    created() {
      const id: string = this.$route.params.id;

      for (let i = 0; i < this.episode.length; i++) {
        if (this.episode[i].id === id) {
          this.index = i;
          return;
        }
      }

      if (!this.episode[this.index]) {
        this.$router.push('/');
      }
    },
  });
</script>
