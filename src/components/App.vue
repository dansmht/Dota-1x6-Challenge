<template>
  <the-header />
  <suspense>
    <dota-challenge />
  </suspense>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import DotaChallenge from "./DotaChallenge.vue";

export default {
  components: { TheHeader, DotaChallenge },
};
</script>
