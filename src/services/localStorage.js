import { store } from "../store";
import { HeroesHelper } from "../utils/HeroesHelper";

const HEROES_PROGRESS = "HEROES_PROGRESS";
const COMPLETED_HEROES = "COMPLETED_HEROES";

const getHeroesProgressLS = () => {
  return localStorage.getItem(HEROES_PROGRESS);
};

export const setHeroesProgressLS = (heroesProgress) => {
  return localStorage.setItem(HEROES_PROGRESS, JSON.stringify(heroesProgress));
};

const getCompletedHeroesLS = () => {
  return localStorage.getItem(COMPLETED_HEROES);
};

export const setCompletedHeroesLS = (completedHeroes) => {
  return localStorage.setItem(
    COMPLETED_HEROES,
    JSON.stringify(completedHeroes)
  );
};

export const compareHeroesProgressWithLS = (heroesProgress) => {
  const heroesProgressLS = getHeroesProgressLS();

  if (JSON.stringify(heroesProgress) === heroesProgressLS) {
    return true;
  }

  return false;
};

const syncHeroesProgress = () => {
  const heroesProgressLS = getHeroesProgressLS();

  if (!heroesProgressLS) {
    return setHeroesProgressLS({});
  }

  const heroesProgress = JSON.parse(heroesProgressLS);

  if (HeroesHelper.isProgress(heroesProgress)) {
    store.heroesProgress = heroesProgress;
  }
};

const syncCompletedHeroes = () => {
  const completedHeroesLS = getCompletedHeroesLS();

  if (!completedHeroesLS) {
    return setCompletedHeroesLS({});
  }

  const completedHeroes = JSON.parse(completedHeroesLS);

  if (HeroesHelper.isCompleted(completedHeroes)) {
    store.completedHeroes = completedHeroes;
  }
};

export const syncStoreWithLS = () => {
  syncHeroesProgress();
  syncCompletedHeroes();
};
