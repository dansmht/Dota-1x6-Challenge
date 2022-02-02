import { computed } from "@vue/runtime-core";

import { store } from "../store";

const useHeroes = () => {
  const completedHeroes = computed(() =>
    store.heroes.filter(({ name }) => store.completedHeroes[name])
  );
  const uncompletedHeroes = computed(() =>
    store.heroes.filter(({ name }) => !store.completedHeroes[name])
  );

  return { completedHeroes, uncompletedHeroes };
};

export default useHeroes;
