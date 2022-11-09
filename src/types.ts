import type { Ref } from "vue";

export interface Person {
  name: string;
  region: Region;
  age: number;
  birthdate?: Ref<Date> | null;
  remainingYears?: number;
  remainingWeeks?: number;
  color?: string;
}

export interface Week {
  week: number;
  lit: boolean;
}

export interface Region {
  /* Unique ID of the Region */
  id: string;

  /* The name of the region. */
  region: string;

  /* Life Expectancy in years. Rounded. */
  life_expectancy: number;
}
