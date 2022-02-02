import { store } from "../store";
import { supabase } from "../supabase"

export const completeSkill = async (hero, skill) => {
  if (store.user?.id) {
    const updatedHeroesProgress = store.heroesProgress;

    if (!updatedHeroesProgress[hero]) {
      updatedHeroesProgress[hero] = {};
    }
    updatedHeroesProgress[hero][skill] = true;

    await supabase
      .from("challenge")
      .upsert({ heroes: updatedHeroesProgress, user_id: store.user.id }, { onConflict: "user_id" })
      .match({ user_id: store.user.id });
  }
};

export const cancelSkill = async (hero, skill) => {
  if (store.user?.id) {
    const updatedHeroesProgress = store.heroesProgress;

    delete updatedHeroesProgress[hero][skill];

    if (Object.values(updatedHeroesProgress[hero]).length === 0) {
      delete updatedHeroesProgress[hero];
    }

    if (Object.values(updatedHeroesProgress).length === 0) {
      await supabase
        .from("challenge")
        .delete()
        .match({ user_id: store.user.id });
    } else {
      await supabase
        .from("challenge")
        .upsert({ heroes: updatedHeroesProgress, user_id: store.user.id }, { onConflict: "user_id" })
        .match({ user_id: store.user.id });
    }
  }
}

export const getHeroesProgressFromSupabase = async () => {
  if (store.user?.id) {
    const { data } = await supabase
      .from("challenge")
      .select("*")
      .match({ user_id: store.user.id });

    if (Array.isArray(data)) {
      store.heroesProgress = data[0]?.heroes ?? {};
    }
  }
};

export const resetChallengeProgress = async () => {
  if (store.user?.id) {
    await supabase
      .from("challenge")
      .delete()
      .match({ user_id: store.user.id });

    store.heroesProgress = {};
    store.completedHeroes = {};
  }
};
