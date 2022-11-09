import { defineStore } from "pinia";
import type { ComputedRef } from "vue";
import { computed, reactive } from "vue";
import type { Person } from "@/types";
import { world, switzerland, regions } from "@/regions";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { random } from "underscore";

export const useLifeExpectancyStore = defineStore("lifeExpectancy", () => {
  const region = regions[random(regions.length - 1)];
  const persons: Person[] = reactive([
    {
      name: "Person A",
      region: region,
      age: random(18, 60),
    },
    {
      name: "Person B",
      region: region,
      age: random(18, 60),
    },
  ]);

  const canPersonBeAdded: ComputedRef<boolean> = computed(() => {
    return persons.length < 3;
  });

  function addPerson(): void {
    persons.push(
      reactive({
        name: "Person B",
        region: world,
        age: 65,
      })
    );
  }

  function removePerson(index: number): void {
    persons.splice(index, 1);
  }

  // Highest Life Expectancy of all persons
  const highestLifeExpectancy: ComputedRef<number> = computed(() => {
    return Math.max(
      ...persons.map((person: Person) => person.region.life_expectancy)
    );
  });

  // Return the oldest person in the list
  const oldestPerson: ComputedRef<Person> = computed(() => {
    return persons.reduce((prev: Person, current: Person) =>
      prev.age > current.age ? prev : current
    );
  });

  const personWithSmallestRemainingYears: ComputedRef<Person> = computed(() => {
    return persons.reduce((prev, current) => {
      const remainingYears = Math.abs(
        current.region.life_expectancy - current.age
      );
      const prevRemainingYears = Math.abs(
        prev.region.life_expectancy - prev.age
      );

      return prevRemainingYears > remainingYears ? current : prev;
    });
  });

  const remainingYears: ComputedRef<number> = computed(() => {
    if (persons.length === 1) {
      return 0;
    }

    const person: Person = personWithSmallestRemainingYears.value;

    return person.region.life_expectancy - person.age;
  });

  const ageToShow: ComputedRef<number> = computed(() => {
    return persons[0].age ?? 0;
  });

  return {
    persons,
    canPersonBeAdded,
    highestLifeExpectancy,
    oldestPerson,
    personWithSmallestRemainingYears,
    remainingYears,
    ageToShow,
    addPerson,
    removePerson,
  };
});
