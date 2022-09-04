<template>
  <button
    class="tw-w-8 tw-h-8 tw-text-center tw-block before-font-material before:tw-content-['\e1c4'] before:tw-block before:tw-text-4xl before:tw-leading-8"
    :class="[
      color === 'green' ? 'before:tw-text-green' : 'before:tw-text-black',
    ]"
    :title="title"
    @click.stop="handleClick"
  >
    <span class="tw-hidden">{{ title }}</span>
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Player',
    props: {
      title: {
        required: true,
        type: String,
      },
      color: {
        required: true,
        type: String,
      },
    },
    methods: {
      handleClick() {
        this.$emit('set-click');
      },
    },
  });
</script>
