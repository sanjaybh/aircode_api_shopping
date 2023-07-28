<script setup>
import HelloWorld from '@/HelloWorld.vue'
import TheWelcome from '@/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="https://pkxfpp.hk.aircodecdn.com/logo-277e0e97.1690184455391_aq4i2zh9jvk.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
