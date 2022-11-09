import { computed } from "vue";
import type { Ref } from "vue";
import type { Region } from "@/types";

export function useLifeExpectancySinglePerson(
  region: Ref<Region>,
  age: Ref<number>
) {
  const lifeExpectancy = computed<number>(() => region.value.life_expectancy);

  const lifeExpectancyInWeeks = computed<number>(
    () => lifeExpectancy.value * 52
  );

  const remainingYears = computed<number>(
    () => lifeExpectancy.value - age.value
  );
  const remainingYearsInWeeks = computed<number>(
    () => remainingYears.value * 52
  );

  return {
    lifeExpectancy,
    lifeExpectancyInWeeks,
    remainingYears,
    remainingYearsInWeeks,
  };
}
