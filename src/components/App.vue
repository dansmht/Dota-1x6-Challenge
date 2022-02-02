<template>
  <the-header />
  <dota-challenge />
  <the-footer />
</template>

<script>
import TheHeader from "./TheHeader.vue";
import DotaChallenge from "./DotaChallenge.vue";
import TheFooter from "./TheFooter.vue";

export default {
  components: { TheHeader, DotaChallenge, TheFooter },
};
</script>
