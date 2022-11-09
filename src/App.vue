<script setup lang="ts">
import TheHero from "./components/TheHero.vue";
import TheFooter from "./components/TheFooter.vue";
import StyledLink from "./components/StyledLink.vue";
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { differenceInWeeks, format, parse, subYears } from "date-fns";
import CustomLabel from "./components/CustomLabel.vue";
import CustomInput from "./components/CustomInput.vue";
import InputGroup from "./components/InputGroup.vue";
import ComboBox from "./components/ComboBox.vue";
import LifeCalendar from "./components/LifeCalendar.vue";
import { useLifeExpectancyStore } from "@/stores/useLifeExpectancyStore";

const store = useLifeExpectancyStore();

// TODO: On mount use the users location as the default location

// -------
// Default State
// Average Life Expectancy of the World
// Age: Random Value between 15 and 70

const birthdate: Ref = ref(format(subYears(new Date(), 30), "yyyy-MM-dd"));
const parsedBirthDate = computed<Date>(() =>
  parse(birthdate.value, "yyyy-MM-dd", new Date())
);
const ageInWeeksBasedOnBirthdate = computed<number>(() =>
  differenceInWeeks(new Date(), parsedBirthDate.value)
);

const yearlySeeingDays: Ref<number> = ref(52);

const remainingDaysTogether = computed(() => {
  return store.remainingYears * yearlySeeingDays.value;
});
</script>

<template>
  <div
    class="w-screen min-h-screen bg-gray-50 p-4 md:p-8 relative scroll-smooth"
  >
    <div class="container mx-auto">
      <TheHero />

      <header
        ref="persons"
        id="persons"
        class="my-4 p-4 md:my-8 md:p-8 text-gray-900 border-4 border-gray-300 rounded-lg shadow-lg shadow-gray-200/25 bg-white max-w-5xl mx-auto"
      >
        <h2 class="text-lg font-semibold">Persons</h2>
        <div class="prose">
          <p>
            We added 2 persons for you. The age and region have been randomly
            selected to give you a head start. Feel free to change them!
          </p>
        </div>

        <div class="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TransitionGroup name="list">
            <fieldset
              v-for="(person, index) in store.persons"
              :key="index"
              class="border-2 bg-white rounded-lg p-4 relative"
            >
              <legend class="my-2 font-semibold">
                <input
                  type="text"
                  v-model="person.name"
                  class="border-2 border-gray-200 rounded px-1 py-0"
                />
              </legend>

              <button
                type="button"
                title="Remove Person"
                @click="store.removePerson(index)"
                v-if="store.persons.length > 1"
                class="bg-red-100 text-red-600 rounded-md px-3 py-1 text-xs font-semibold hover:bg-red-200 absolute -top-3 right-2"
              >
                &times;
                <span class="sr-only"> Remove Person </span>
              </button>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <InputGroup class="md:col-span-1">
                  <template #label>
                    <CustomLabel for="age">Current Age</CustomLabel>
                  </template>
                  <CustomInput
                    type="number"
                    id="age"
                    v-model.number.trim.lazy="person.age"
                    min="0"
                    :max="120"
                  />
                </InputGroup>

                <ComboBox v-model.lazy="person.region">
                  <template #label>Region</template>
                </ComboBox>

                <InputGroup class="md:col-span-2" v-if="false">
                  <template #label>
                    <CustomLabel for="birthdate">Birthdate</CustomLabel>
                  </template>
                  <CustomInput
                    type="date"
                    id="birthdate"
                    v-model.trim="person.birthdate"
                  />
                </InputGroup>
              </div>

              <dl class="mt-4">
                <div class="flex justify-between">
                  <dt class="font-semibold">Life Expectancy:</dt>
                  <dd class="tabular-nums font-mono text-sm">
                    {{ person.region.life_expectancy }} years
                  </dd>
                </div>

                <div class="flex justify-between">
                  <dt class="font-semibold">Remaining Years:</dt>
                  <dd class="tabular-nums font-mono text-sm">
                    {{ person.region.life_expectancy - person.age }} years
                  </dd>
                </div>
              </dl>
            </fieldset>
          </TransitionGroup>
        </div>

        <div class="flex items-center justify-center">
          <button
            @click="store.addPerson"
            :disabled="store.canPersonBeAdded === false"
            class="transform transition duration-300 rounded bg-yellow-300 text-yellow-700 font-semibold px-3 py-1 shadow-md shadow-yellow-500/50 hover:bg-yellow-400 hover:shadow-lg hover:-rotate-1 hover:scale-110 disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:transform-none disabled:shadow disabled:shadow-gray-300/50"
          >
            Add Person
          </button>
        </div>

        <Transition name="list">
          <InputGroup
            v-if="store.persons.length > 1"
            class="mx-auto max-w-sm mt-12"
          >
            <template #label>
              <CustomLabel for="yearly_seeing_days"
                >Number of Days you see each other per year
              </CustomLabel>
            </template>
            <CustomInput
              type="number"
              id="yearly_seeing_days"
              v-model.number.trim.lazy="yearlySeeingDays"
              min="0"
              max="365"
            />
            <span class="text-sm text-gray-600">
              Based on this number, the number of remaining years and weeks are
              calculated.
            </span>
          </InputGroup>
        </Transition>
      </header>
    </div>

    <main class="container mx-auto max-w-5xl">
      <div class="mx-auto max-w-3xl">
        <div
          class="border-2 border-yellow-400 p-4 rounded-xl bg-white text-center text-lg font-medium mb-8"
          v-if="store.remainingYears > 0"
        >
          Statistically, you have
          <span class="bg-yellow-100 text-xl px-1 py-1 font-bold"
            >{{ store.remainingYears }} years</span
          >
          left together with the other persons.
        </div>

        <div
          class="border-2 border-yellow-400 py-4 px-8 rounded-xl bg-white max-w-lg mx-auto"
          v-if="remainingDaysTogether > 0"
        >
          <p class="text-center text-lg font-medium">
            Based on your input, you will meet the other persons for
            <span class="bg-yellow-100 text-xl px-1 py-1 font-bold"
              >{{ remainingDaysTogether }} days</span
            >
            in their remaining years.
          </p>
        </div>
      </div>

      <LifeCalendar :remaining-days-together="remainingDaysTogether" />

      <p class="text-gray-500 text-center max-w-lg mx-auto mb-24 md:mb-0">
        Life expactancy data for countries and the world comes from

        <StyledLink
          href="https://ourworldindata.org/life-expectancy"
          target="_blank"
        >
          Our World in Data
        </StyledLink>
        and includes data up to 2019.
      </p>
    </main>
    <TheFooter />
  </div>
</template>

<style>
.list-enter-active,
.list-leave-active {
  opacity: 1;
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
