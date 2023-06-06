<script setup lang="ts">
import {inject} from "vue";
import {avatarURL} from "../utils/avatarURL.ts";
import type {IUser} from "../types";

const user = inject("user") as IUser;
</script>

<template>
  <div>
    Home
  </div>
  <img v-if="user?.avatar" :src="avatarURL(user.id, user.avatar)"/>
</template>

<style scoped>

</style>