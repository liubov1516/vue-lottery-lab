<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink class="app-logo" :to="{ name: 'home' }" aria-label="Lottery, на головну">
    <svg
      class="app-logo__icon"
      viewBox="0 0 40 40"
      width="36"
      height="36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19 20C8 20 4 14 7 8C10 2 18 5 19 15C20 5 29 2 33 8C37 14 31 20 21 20C31 21 35 29 30 33C25 37 20 30 20 22C19 32 12 37 7 32C2 27 8 21 19 20Z"
        fill="#A3E635"
      />
      <path
        d="M20 21C20 27 17 32 12 36"
        stroke="#65A30D"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M27 4L28.5 7.5L32 9L28.5 10.5L27 14L25.5 10.5L22 9L25.5 7.5Z"
        fill="#65A30D"
      />
    </svg>

    <span class="app-logo__text">Lottery</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.app-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #65a30d;
  font-size: 1.25rem;
  font-weight: 800;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.app-logo:hover {
  opacity: 0.8;
}

.app-logo__icon {
  flex-shrink: 0;
}

.app-logo__text {
  color: var(--app-logo-text);
  letter-spacing: -0.02em;
}
</style>
