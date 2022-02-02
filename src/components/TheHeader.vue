<template>
  <header
    class="
      bg-black/50
      h-12
      text-white
      border-b-2 border-black
      shadow-md shadow-black
    "
  >
    <div class="container h-full flex justify-between items-center">
      <app-logo />
      <button v-if="!store.user" type="button" @click="signInWithGoogle">
        Sign In
      </button>
      <button v-else type="button" @click="signOut">Sign Out</button>
    </div>
  </header>
</template>

<script>
import AppLogo from "./AppLogo.vue";

import { store } from "../store";
import { signInWithGoogle, signOut } from "../supabase";

export default {
  components: { AppLogo },

  setup() {
    return { store, signInWithGoogle, signOut };
  },
};
</script>
