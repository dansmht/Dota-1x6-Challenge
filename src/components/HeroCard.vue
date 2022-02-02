<template>
  <li>
    <button
      class="relative w-full aspect-video"
      type="button"
      @click="openHeroModal"
    >
      <img
        :src="`images/heroes/${name}/img.jpg`"
        :alt="name"
        class="aspect-video"
      />
      <div
        class="
          text-7xl
          absolute
          inset-0
          transition-colors
          flex
          justify-center
          items-center
          duration-300
          hover:bg-slate-900/50
        "
        :class="{
          [`bg-slate-900/50 hover:bg-slate-900/75 ${getTextColorBySkillsProgress(
            skillsProgress
          )}`]: !completed,
        }"
      >
        {{ !completed ? `${skillsProgress}/4` : "" }}
      </div>
    </button>
  </li>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

import { store } from "../store";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["toggleModal", "setActiveHero"],
  setup(props, { emit }) {
    const { name } = toRefs(props);

    const skillsProgress = computed(
      () => Object.values(store.heroesProgress[name.value] ?? []).length
    );

    const openHeroModal = () => {
      emit("setActiveHero", name.value);
      emit("toggleModal");
    };

    const getTextColorBySkillsProgress = (completedSkills) => {
      if (completedSkills === 0) {
        return "text-gray-400";
      } else if (completedSkills === 1) {
        return "text-orange-400";
      } else if (completedSkills === 2) {
        return "text-amber-400";
      }
      return "text-lime-500";
    };

    return {
      name,
      openHeroModal,
      skillsProgress,
      getTextColorBySkillsProgress,
    };
  },
};
</script>
