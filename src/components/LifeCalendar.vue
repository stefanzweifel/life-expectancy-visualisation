<script setup lang="ts">
import CalendarTitle from "./CalendarTitle.vue";
import CalendarLegend from "./CalendarLegend.vue";
import WeekIndicator from "./WeekIndicator.vue";
import { useLifeExpectancyStore } from "@/stores/useLifeExpectancyStore";
import { ref } from "vue";

const tabView = ref("years");

const store = useLifeExpectancyStore();
const persons = store.persons;

const props = defineProps<{
  remainingDaysTogether: number;
}>();
</script>

<template>
  <div
    class="my-8 bg-white p-4 md:p-8 text-gray-900 border-2 border-blue-400 rounded-lg shadow-xl space-y-8"
  >
    <h2 class="text-lg font-semibold">Life Calendar</h2>

    <CalendarLegend />
    <template v-for="(person, personIndex) in persons" :key="personIndex">
      <div>
        <CalendarTitle class="mb-2">
          Life Calendar in Years for {{ person.name }}
        </CalendarTitle>

        <div class="flex flex-wrap gap-1">
          <div
            v-for="index in person.region.life_expectancy"
            :key="index"
            class="rounded-full h-3 md:h-2 w-3 md:w-2 transition"
            :title="`Year #${index}`"
            :class="{
              'bg-blue-600': index <= person.age,
              'bg-blue-200': index > person.age,
            }"
          ></div>
        </div>
      </div>
      <div v-if="true">
        <CalendarTitle class="mb-2">
          Life Calendar in Weeks for {{ person.name }}
        </CalendarTitle>

        <div class="flex flex-wrap gap-1">
          <div
            v-for="index in person.region.life_expectancy * 52"
            :key="index"
            class="rounded-full h-3 md:h-2 w-3 md:w-2 transition"
            :title="`Week #${index}`"
            :class="{
              'bg-blue-600': index <= person.age * 52,
              'bg-blue-200': index > person.age * 52,
            }"
          ></div>
        </div>
      </div>
    </template>

    <div v-if="true">
      <h4 class="mb-4 font-bold">
        {{ remainingDaysTogether }} days left together
      </h4>
      <div class="flex flex-wrap gap-1">
        <div
          v-for="index in remainingDaysTogether"
          :key="index"
          class="rounded-sm h-3 md:h-6 w-2 md:w-4 transition bg-gradient-to-br from-green-600 to-green-500"
          :title="`Day #${index}`"
        ></div>
      </div>
    </div>
  </div>
</template>
