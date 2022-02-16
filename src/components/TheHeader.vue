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
        Cloud Save <span class="text-red-400 font-bold">Off</span>
      </button>
      <button v-else type="button" @click="signOut">
        Cloud Save <span class="text-green-400 font-bold">On</span>
      </button>
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
