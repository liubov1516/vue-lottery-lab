<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { LogoutButton } from '@/features/auth'

const session = useSessionStore()

const links = [
  { name: 'home', label: 'Home' },
  { name: 'about', label: 'About author' },
  { name: 'users', label: 'Users' },
]
</script>

<template>
  <nav aria-label="Головне меню">
    <ul class="nav nav-pills flex-wrap align-items-center gap-1">
      <li v-for="link in links" :key="link.name" class="nav-item">
        <!-- RouterLink сам додає клас active, коли маршрут збігається -->
        <RouterLink class="nav-link" :to="{ name: link.name }">{{ link.label }}</RouterLink>
      </li>
      <li class="nav-item">
        <LogoutButton v-if="session.isAuthenticated" />
        <RouterLink v-else class="nav-link" :to="{ name: 'login' }">
          <i class="bi bi-box-arrow-in-right me-1" aria-hidden="true"></i>Login
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
