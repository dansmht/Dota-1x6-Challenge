import { store } from "../store";
import { supabase } from "../supabase";
import { compareHeroesProgressWithLS } from "./localStorage";

export const completeSkill = async (hero, skill) => {
  const updatedHeroesProgress = store.heroesProgress;

  if (!updatedHeroesProgress[hero]) {
    updatedHeroesProgress[hero] = {};
  }
  updatedHeroesProgress[hero][skill] = true;

  await setHeroesProgressToSupabase(updatedHeroesProgress);
};

export const cancelSkill = async (hero, skill) => {
  const updatedHeroesProgress = store.heroesProgress;

  delete updatedHeroesProgress[hero][skill];

  if (Object.values(updatedHeroesProgress[hero]).length === 0) {
    delete updatedHeroesProgress[hero];
  }

  if (store.user?.id) {
    if (Object.values(updatedHeroesProgress).length === 0) {
      await supabase
        .from("challenge")
        .delete()
        .match({ user_id: store.user.id });
    } else {
      await setHeroesProgressToSupabase(updatedHeroesProgress);
    }
  }
};

export const setHeroesProgressToSupabase = async (heroesProgress) => {
  if (store.user?.id) {
    await supabase
      .from("challenge")
      .upsert(
        { heroes: heroesProgress, user_id: store.user.id },
        { onConflict: "user_id" }
      )
      .match({ user_id: store.user.id });
  }
};

export const getHeroesProgressFromSupabase = async () => {
  if (store.user?.id) {
    const { data } = await supabase
      .from("challenge")
      .select("*")
      .match({ user_id: store.user.id });

    if (Array.isArray(data)) {
      const heroesProgress = data[0]?.heroes ?? {};
      if (!compareHeroesProgressWithLS(heroesProgress)) {
        store.cloud.showSyncModal = true;
        store.cloud.data = heroesProgress;
      }
    }
  }
};

export const resetChallengeProgress = async () => {
  store.completedHeroes = {};
  store.heroesProgress = {};

  if (store.user?.id) {
    await supabase.from("challenge").delete().match({ user_id: store.user.id });
  }
};
