import { reactive } from "@vue/reactivity";

import { heroes } from "./constants/heroes";

export const store = reactive({
  heroesLoading: false,
  user: null,
  heroesProgress: {},
  completedHeroes: {},
  heroes,
});
