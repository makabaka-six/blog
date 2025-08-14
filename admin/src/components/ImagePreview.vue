<template>
  <img :src="src" class="image" alt="😭" :style="{ width: width + 'px', height: height + 'px', objectFit: 'cover' }" />
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 50
  },
  height: {
    type: Number,
    default: 50
  }
});
</script>

<style lang="scss" scoped>
.image {
  background: #f5f6f7;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
}
</style>
