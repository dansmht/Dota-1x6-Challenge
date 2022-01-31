<template>
  <h1>Dota 1x6 Challenge</h1>
</template>

<script>
import { store } from "../store";
import { filterUserData, getUser, supabase } from "../supabase";

export default {
  async setup() {
    store.user = filterUserData(getUser());

    supabase.auth.onAuthStateChange((_, session) => {
      store.user = filterUserData(session?.user);
    });

    return { store };
  },
};
</script>
