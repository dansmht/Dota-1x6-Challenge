<template>
  <header class="bg-orange-500 h-12 text-white">
    <div class="max-w-5xl mx-auto h-full flex justify-between items-center">
      <div>Logo</div>
      <button v-if="!store.user" type="button" @click="signInWithGoogle">
        Sign In
      </button>
      <button v-else type="button" @click="signOut">Sign Out</button>
    </div>
  </header>
</template>

<script>
import { store } from "../store";
import { signInWithGoogle, signOut } from "../supabase";

export default {
  setup() {
    return { store, signInWithGoogle, signOut };
  },
};
</script>
