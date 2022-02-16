<template>
  <the-header />
  <dota-challenge />
  <the-footer />
</template>

<script>
import { onBeforeMount } from "@vue/runtime-core";

import TheHeader from "./TheHeader.vue";
import DotaChallenge from "./DotaChallenge.vue";
import TheFooter from "./TheFooter.vue";

import { syncStoreWithLS } from "../services/localStorage";

export default {
  components: { TheHeader, DotaChallenge, TheFooter },
  setup() {
    onBeforeMount(() => {
      syncStoreWithLS();
    });
  },
};
</script>
