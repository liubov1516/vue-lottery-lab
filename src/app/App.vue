<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { AppToast } from '@/shared/ui'

// Layouts теж завантажуються асинхронно
const DefaultLayout = defineAsyncComponent(() => import('@/app/layouts/DefaultLayout.vue'))
const AuthLayout = defineAsyncComponent(() => import('@/app/layouts/AuthLayout.vue'))

const route = useRoute()

// Layout обирається за полем meta.layout поточного маршруту
const layout = computed(() => (route.meta.layout === 'auth' ? AuthLayout : DefaultLayout))
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
  <!-- Контейнер сповіщень: одне місце на весь застосунок -->
  <AppToast />
</template>
