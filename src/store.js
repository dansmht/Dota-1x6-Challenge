import { reactive } from "@vue/reactivity";

export const store = reactive({
  initialized: false,
  user: null,
  heroesProgress: {},
  completedHeroes: {},
  heroes: [
    { name: "axe" },
    { name: "bristleback" },
    { name: "ember_spirit" },
    { name: "hoodwink" },
    { name: "huskar" },
    { name: "juggernaut" },
    { name: "legion_commander" },
    { name: "lina" },
    { name: "phantom_assassin" },
    { name: "puck" },
    { name: "pudge" },
    { name: "queen_of_pain" },
    { name: "shadow_fiend" },
    { name: "terrorblade" },
    { name: "troll_warlord" },
    { name: "void_spirit" },
    { name: "wraith_king" },
  ],
});
