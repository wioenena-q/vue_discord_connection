<script setup lang="ts">
import Header from "./components/layouts/Header.vue";
import MainProvider from "./providers/Main.vue";
</script>

<template>
  <MainProvider>
    <Header/>
    <router-view/>
  </MainProvider>
</template>