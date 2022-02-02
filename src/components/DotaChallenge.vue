<template>
  <main class="container flex-grow flex flex-col">
    <h1 class="sr-only">Dota 1x6 Challenge</h1>

    <template v-if="store.user && store.initialized">
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

    <div
      v-else-if="!store.user"
      class="
        text-center text-xl
        absolute
        left-4
        right-4
        top-1/2
        -translate-y-1/2
      "
    >
      You should Sign In to use this App
    </div>

    <div
      v-else-if="!store.initialized"
      class="flex-grow flex justify-center items-center"
    >
      <loader />
    </div>
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
