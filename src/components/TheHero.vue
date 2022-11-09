<script setup lang="ts">
import StyledLink from "./StyledLink.vue";
</script>

<template>
  <div class="text-center max-w-2xl mx-auto my-12 text-gray-900 space-y-2">
    <h1 class="text-5xl font-black mb-4">What Are You Doing With Your Life?</h1>
    <p class="text-lg">
      Inspired by
      <StyledLink href="https://www.youtube.com/c/inanutshell" target="_blank"
        >Kurzgesagt</StyledLink
      >'s video
      <StyledLink
        href="https://www.youtube.com/watch?v=JXeJANDKwDc"
        target="_blank"
      >
        "What Are You Doing With Your Life?"</StyledLink
      >, this website tells you how many days, weeks and years you
      <i>statistically</i> have left to live on this planet.
    </p>
  </div>
</template>
