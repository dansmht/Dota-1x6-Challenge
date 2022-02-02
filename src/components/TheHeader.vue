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
