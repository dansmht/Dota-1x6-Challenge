import { watch } from "@vue/runtime-core";

import { store } from "../store";
import { getHeroesProgressFromSupabase } from "../services/supabase";
import {
  setCompletedHeroesLS,
  setHeroesProgressLS,
} from "../services/localStorage";

const useWatchers = () => {
  watch(
    () => store.user,
    async () => {
      await getHeroesProgressFromSupabase();
    },
    { deep: true }
  );

  const updateCompletedHeroes = () => {
    if (Object.keys(store.heroesProgress).length === 0) {
      store.completedHeroes = {};
    }
    store.heroes.forEach(({ name }) => {
      const heroProgress = store.heroesProgress[name];

      if (heroProgress) {
        const values = Object.values(heroProgress);

        if (values.length === 4 && values.every(Boolean)) {
          store.completedHeroes[name] = true;
        } else {
          delete store.completedHeroes[name];
        }
      }
    });
  };

  watch(
    () => store.heroesProgress,
    () => {
      setHeroesProgressLS(store.heroesProgress);
      updateCompletedHeroes();
    },
    { deep: true }
  );

  watch(
    () => store.completedHeroes,
    () => {
      setCompletedHeroesLS(store.completedHeroes);
    },
    { deep: true }
  );
};

export default useWatchers;
