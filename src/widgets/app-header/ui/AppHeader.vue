<script setup lang="ts">
import { useSessionStore } from '@/entities/session'
import { UserAvatar } from '@/entities/user'
import { ThemeToggle } from '@/features/theme-toggle'
import AppLogo from './AppLogo.vue'
import AppNavigation from './AppNavigation.vue'

const session = useSessionStore()
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <AppLogo />
      <AppNavigation />
      <div class="app-header__right">
        <ThemeToggle />
        <div v-if="session.user" class="app-header__user">
          <UserAvatar
            :first-name="session.user.firstName"
            :last-name="session.user.lastName"
            :image="session.user.image"
            :size="28"
          />
          <span>{{ session.user.firstName }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: var(--app-surface);
  border-bottom: 1px solid var(--app-border);
}

.app-header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  max-width: 980px;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.app-header__right {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.app-header__user {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--app-text-muted);
  font-weight: 600;
}
</style>
