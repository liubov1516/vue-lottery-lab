<script setup lang="ts">
import type { User } from '@/entities/user'
import { AppButton } from '@/shared/ui'
import WinnerItem from './WinnerItem.vue'

defineProps<{
  winners: User[]
  canPickWinner: boolean
}>()

const emit = defineEmits<{
  'pick-winner': []
  'remove-winner': [id: number]
}>()
</script>

<template>
  <section class="card mb-3">
    <div class="card-body d-flex align-items-center gap-3">
      <div class="winners-list__field form-control">
        <WinnerItem
          v-for="winner in winners"
          :key="winner.id"
          :winner="winner"
          @remove="emit('remove-winner', $event)"
        />
        <span class="winners-list__placeholder">Winners</span>
      </div>
      <AppButton
        class="flex-shrink-0"
        label="New winner"
        :disabled="!canPickWinner"
        @click="emit('pick-winner')"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.winners-list__field {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  min-height: 2.4rem;
  background-color: var(--app-surface);
  border-color: var(--app-border);
}

.winners-list__placeholder {
  margin-left: 0.25rem;
  color: #999;
}
</style>
