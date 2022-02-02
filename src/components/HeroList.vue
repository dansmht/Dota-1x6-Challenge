<template>
  <p class="text-xl">{{ title }}</p>
  <ul
    class="
      pt-2
      pb-6
      grid
      place-items-center
      grid-cols-2
      md:grid-cols-3
      lg:grid-cols-5
      gap-x-4 gap-y-2
    "
  >
    <hero-card
      v-for="hero in heroes"
      :key="hero.name"
      :name="hero.name"
      :completed="completed"
      @toggleModal="toggleModal"
      @setActiveHero="setActiveHero"
    />
  </ul>
</template>

<script>
import HeroCard from "./HeroCard.vue";

export default {
  components: { HeroCard },
  props: {
    title: {
      type: String,
      required: true,
    },
    heroes: {
      type: Array,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["setActiveHero", "toggleModal"],
  setup(props, { emit }) {
    const setActiveHero = (hero) => {
      emit("setActiveHero", hero);
    };

    const toggleModal = () => {
      emit("toggleModal");
    };

    return { setActiveHero, toggleModal };
  },
};
</script>
