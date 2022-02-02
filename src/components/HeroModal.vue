<template>
  <teleport to="#modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-slate-900/70 cursor-pointer"
      @click="toggleModal"
    >
      <div class="bg-red-900/501 flex justify-center items-center h-full px-4">
        <ul
          class="
            grid
            gap-4
            grid-cols-2
            md:grid-cols-4
            border-4
            shadow-md shadow-[#e5e7eb]
            bg-gray-900/80
            p-10
            cursor-default
          "
          @click.stop
        >
          <li
            v-for="skill in 4"
            :key="skill"
            class="
              relative
              flex
              w-32
              h-32
              overflow-hidden
              border-4
              before:inset-0 before:absolute before:duration-300
              hover:before:bg-slate-900/75
              group
              focus-within:before:bg-slate-900/75
            "
            :class="{
              'border-green-600 before:bg-slate-900/75':
                checkIfCompleted(skill),
            }"
          >
            <div>
              <button
                type="button"
                class="
                  absolute
                  left-0
                  top-0
                  w-full
                  bg-red-900/75
                  mt-4
                  text-2xl
                  duration-300
                  opacity-0
                  -translate-y-14
                  group-hover:opacity-100 group-hover:translate-y-0
                  group-focus-within:opacity-100
                  group-focus-within:translate-y-0
                "
                :disabled="isLoading"
                @click="toggleSkill(skill)"
              >
                {{ checkIfCompleted(skill) ? "Cancel" : "Complete" }}
              </button>
              <img :src="`images/heroes/${hero}/${skill}.jpg`" :alt="hero" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, toRefs } from "@vue/reactivity";

import { useHandlingEscapePress, useLoading } from "../composables";
import { store } from "../store";
import { cancelSkill, completeSkill } from "../services/supabase";

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: false,
    },
    hero: {
      type: String,
      required: true,
    },
  },
  emits: ["toggleModal"],
  setup(props, { emit }) {
    const { isOpen, hero } = toRefs(props);

    const { isLoading, setLoading } = useLoading();

    const checkIfCompleted = (skill) => {
      return store.heroesProgress[hero.value]?.[skill];
    };

    const toggleModal = () => {
      emit("toggleModal");
    };

    const toggleSkill = async (skill) => {
      setLoading(true);

      try {
        if (!store.heroesProgress[hero.value]?.[skill]) {
          await completeSkill(hero.value, skill);
        } else {
          await cancelSkill(hero.value, skill);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    useHandlingEscapePress({ isOpen, toggleModal });

    return {
      isOpen,
      hero,
      isLoading,
      toggleModal,
      checkIfCompleted,
      toggleSkill,
    };
  },
};
</script>
