<script setup lang="ts">
import { withBase } from 'vitepress';

const props = defineProps<{
  link: string;
  title: string;
  description?: string;
  imageURL?: string;
  imageHeight?: string;
  single?: boolean;
  openInNewTab?: boolean;
  autoDark?: boolean;
}>();
const linkWithBase = withBase(props.link);
</script>

<template>
<div class="list-box" :class="{ 'single-box': !!single }">
  <a :href="linkWithBase" class="list-box-link" :target="openInNewTab ? '_blank' : undefined">
    <p class="list-box-title">{{ title }}</p>
    <p class="list-box-description">{{ description }}</p>
    <img v-if="props.imageURL" class="list-box-image" :class="{ 'auto-dark-img': !!props.autoDark}" :src=props.imageURL 
      :style="`height: ${props.imageHeight}px;`">
  </a>
</div>
</template>

<style scoped>
.list-box {
  padding: 12px;
  flex: 0 1 100%;
}

.list-box-link {
  text-decoration: none;
  cursor: pointer;
  outline: none;
  display: flex;
  border-radius: 8px;
  box-shadow: var(--vp-shadow-1);
  padding: 18px;
  transition: box-shadow .15s ease;
  text-decoration: none;
  background: var(--vp-c-bg-soft);
  flex-direction: column;
  height: 100%;
}

.list-box-link:hover {
  box-shadow: var(--vp-shadow-2);
  text-decoration: none;
}

.list-box-title {
  margin: 0 0 8px 0;
}

.list-box-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.list-box-image {
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-left: 0;
}

@media (min-width: 768px) {
  .list-box {
    flex-basis: 50%;
  }

  .list-box.single-box {
    flex-basis: 100%;
  }

  .list-box-link {
    padding: 24px;
  }
}
</style>
