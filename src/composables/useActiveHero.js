import { ref } from "@vue/reactivity";

const useActiveHero = () => {
  const activeHero = ref("");

  const setActiveHero = (name) => {
    activeHero.value = name;
  };

  return { activeHero, setActiveHero };
};

export default useActiveHero;
