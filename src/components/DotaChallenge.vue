<template>
  <main class="container flex-grow flex flex-col">
    <h1 class="sr-only">Dota 1x6 Challenge</h1>

    <div
      v-if="store.heroesLoading"
      class="flex-grow flex justify-center items-center"
    >
      <loader />
    </div>

    <template v-else>
      <challenge-stats />
      <div>
        <hero-list
          title="In progress"
          :heroes="uncompletedHeroes"
          :completed="false"
          @toggleModal="toggleModal"
          @setActiveHero="setActiveHero"
        />
        <hero-list
          title="Completed"
          :heroes="completedHeroes"
          :completed="true"
          @toggleModal="toggleModal"
          @setActiveHero="setActiveHero"
        />
      </div>
    </template>
  </main>
  <hero-modal :isOpen="isOpen" :hero="activeHero" @toggleModal="toggleModal" />
</template>

<script>
import ChallengeStats from "./ChallengeStats.vue";
import HeroList from "./HeroList.vue";
import HeroCard from "./HeroCard.vue";
import HeroModal from "./HeroModal.vue";
import Loader from "./Loader.vue";

import {
  useActiveHero,
  useHeroes,
  useModal,
  useUserSubscription,
  useWatchers,
} from "../composables";
import { store } from "../store";

export default {
  components: { HeroCard, ChallengeStats, HeroModal, Loader, HeroList },
  setup() {
    useUserSubscription();

    const { isOpen, toggleModal } = useModal();

    const { completedHeroes, uncompletedHeroes } = useHeroes();

    const { activeHero, setActiveHero } = useActiveHero();

    useWatchers();

    return {
      store,
      isOpen,
      toggleModal,
      activeHero,
      setActiveHero,
      completedHeroes,
      uncompletedHeroes,
    };
  },
};
</script>
