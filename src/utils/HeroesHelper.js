import { allHeroes, allSkills } from "../constants/heroes";

export class HeroesHelper {
  static isStatus = (heroStatus) => {
    if (isObject(heroStatus)) {
      return Object.keys(heroStatus).every((skill) => {
        return allSkills.includes(skill) && heroStatus[skill] === true;
      });
    }
    return false;
  };

  static isProgress = (heroesProgress) => {
    if (isObject(heroesProgress)) {
      return Object.keys(heroesProgress).every((hero) => {
        return allHeroes.includes(hero) && this.isStatus(heroesProgress[hero]);
      });
    }
    return false;
  };
}

const isObject = (value) => {
  return typeof value === "object" && value !== null;
};
