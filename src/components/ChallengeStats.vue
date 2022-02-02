<template>
  <div class="flex justify-between items-center gap-4 my-4">
    <div class="text-xl">Statistics</div>
    <div v-if="initialized" class="flex items-center gap-4">
      <div class="font-bold">
        {{ completedHeroesCount }} / {{ allHeroesCount }}
        <span class="font-normal" :class="completedHeroesPercentageTextColor"
          >({{ completedHeroesPercent }}%)</span
        >
      </div>
      <div class="font-bold">
        {{ completedSkillsCount }} / {{ allSkillsCount }}
        <span class="font-normal" :class="completedSkillsPercentageTextColor"
          >({{ completedSkillsPercent }}%)</span
        >
      </div>
      <button
        type="button"
        class="
          ml-4
          rounded-md
          px-2
          pb-1
          focus:bg-black/50 focus:text-white
          hover:bg-black/50 hover:text-white
          duration-300
        "
        @click="resetProgress"
      >
        Reset Progress
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";

import { store } from "../store";
import { resetChallengeProgress } from "../services/supabase";

export default {
  setup() {
    const initialized = computed(() => store.initialized);

    const allHeroesCount = computed(() => store.heroes.length);
    const completedHeroesCount = computed(
      () => Object.values(store.completedHeroes).length
    );
    const completedHeroesPercent = computed(
      () =>
        ((completedHeroesCount.value / allHeroesCount.value) * 100).toFixed(2) *
        1
    );

    const allSkillsCount = computed(() => store.heroes.length * 4);
    const completedSkillsCount = computed(() =>
      Object.values(store.heroesProgress).reduce(
        (acc, cur) => acc + Object.values(cur).filter(Boolean).length,
        0
      )
    );
    const completedSkillsPercent = computed(
      () =>
        ((completedSkillsCount.value / allSkillsCount.value) * 100).toFixed(2) *
        1
    );

    const getTextColorByPercentage = (percent) => {
      if (percent === 100) {
        return "text-green-500";
      } else if (percent > 80) {
        return "text-lime-500";
      } else if (percent > 60) {
        return "text-yellow-500";
      } else if (percent > 40) {
        return "text-amber-500";
      } else if (percent > 20) {
        return "text-orange-500";
      } else if (percent > 0) {
        return "text-red-500";
      }
      return "text-gray-500";
    };
    const completedHeroesPercentageTextColor = computed(() =>
      getTextColorByPercentage(completedHeroesPercent.value)
    );
    const completedSkillsPercentageTextColor = computed(() =>
      getTextColorByPercentage(completedSkillsPercent.value)
    );

    const resetProgress = () => {
      if (confirm("Are you sure? Your progress will be deleted!")) {
        if (store.user?.id) {
          resetChallengeProgress(store.user.id);
        }
      }
    };

    return {
      initialized,
      allHeroesCount,
      completedHeroesCount,
      completedHeroesPercent,
      allSkillsCount,
      completedSkillsCount,
      completedSkillsPercent,
      completedHeroesPercentageTextColor,
      completedSkillsPercentageTextColor,
      resetProgress,
    };
  },
};
</script>
