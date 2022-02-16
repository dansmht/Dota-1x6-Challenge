import { watch } from "@vue/runtime-core";

import { store } from "../store";
import { getHeroesProgressFromSupabase } from "../services/supabase";
import { setCompletedHeroesLS } from "../services/localStorage";

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
        setCompletedHeroesLS(store.completedHeroes);
      }
    });
  };

  watch(
    () => store.heroesProgress,
    () => {
      console.log("UPDATE DEEP heroesProgress");
      updateCompletedHeroes();
    },
    { deep: true }
  );

  // watch(
  //   () => store.heroesProgress,
  //   () => {
  //     console.log("UPDATE heroesProgress");
  //     updateCompletedHeroes();
  //   }
  // );
};

export default useWatchers;
