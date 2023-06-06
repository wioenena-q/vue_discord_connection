<script lang="ts" setup>
import {inject, provide, ref} from "vue";
import {IConfig, IUser} from "../types";
import {axios} from "../utils/axios.ts";
import {noop} from "../utils/noop.ts";

const config = ref<IConfig>({
  API_URL: import.meta.env.VITE_API_URL
});
const user = ref<IUser | null>(null);

axios(config.value.API_URL + "/auth/me").then(res => {
  user.value = res.data;
}).catch(noop);

provide("user", user);
provide("config", config);
</script>

<template>
  <slot/>
</template>