<script setup lang="ts">
import { AppButton } from '@/shared/ui'
import { useThemeStore } from '../model/theme.store'

const theme = useThemeStore()
</script>

<template>
  <AppButton
    :label="theme.isDark ? 'Light' : 'Dark'"
    :icon="theme.isDark ? 'bi bi-sun' : 'bi bi-moon'"
    severity="secondary"
    text
    small
    @click="theme.toggle"
  />
</template>
