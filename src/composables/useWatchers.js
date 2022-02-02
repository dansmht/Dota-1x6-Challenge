import { watch } from "@vue/runtime-core";

import { store } from "../store";
import { getHeroesProgressFromSupabase } from "../services/supabase";

const useWatchers = () => {
  watch(
    () => store.user,
    async () => {
      await getHeroesProgressFromSupabase();
      store.initialized = true;
    },
    { deep: true }
  );

  watch(
    () => store.heroesProgress,
    () => {
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
    },
    { deep: true }
  );
};

export default useWatchers;
