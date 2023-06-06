<script setup lang="ts">
import {inject} from "vue";
import {IConfig} from "../../types";

const config = inject("config") as IConfig;
const user = inject("user");
</script>

<template>
  <header class="px-4 py-3 bg-black/50 flex justify-between">
    <div>

    </div>
    <div>
      <v-btn variant="plain" density="comfortable" rounded="xl"
             :href="`${config.API_URL}/auth/${user ? 'logout' : 'login'}`">
        {{ user ? "Logout" : "Login" }}
      </v-btn>
    </div>
  </header>
</template>

<style scoped>

</style>