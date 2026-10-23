<script setup lang="ts">
import { UserAvatar, type User, type UserSortKey } from '@/entities/user'
import type { SortOrder } from '@/shared/api'
import { AppButton, AppTable, type TableColumn } from '@/shared/ui'

defineProps<{
  users: User[]
  // Номер першого рядка на сторінці (для другої сторінки це 11)
  startIndex: number
  sortBy: UserSortKey | null
  order: SortOrder
}>()

const emit = defineEmits<{
  sort: [key: UserSortKey]
  remove: [user: User]
}>()

const columns: TableColumn[] = [
  { key: 'index', header: '#' },
  { key: 'firstName', header: 'Name', sortable: true },
  { key: 'age', header: 'Age', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'phone', header: 'Phone number' },
  { key: 'actions', header: '' },
]

function handleSort(field: string): void {
  if (field === 'firstName' || field === 'age') {
    emit('sort', field)
  }
}
</script>

<template>
  <AppTable
    class="users-table"
    :rows="users"
    :columns="columns"
    :sort-field="sortBy"
    :sort-order="order"
    @sort="handleSort"
  >
    <template #cell-index="{ index }">
      <span class="users-table__number">{{ startIndex + index }}</span>
    </template>

    <template #cell-firstName="{ row }">
      <RouterLink class="users-table__name" :to="{ name: 'user-details', params: { id: row.id } }">
        <UserAvatar :first-name="row.firstName" :last-name="row.lastName" :image="row.image" />
        {{ row.firstName }} {{ row.lastName }}
      </RouterLink>
    </template>

    <template #cell-actions="{ row }">
      <div class="d-inline-flex gap-2">
        <AppButton
          label="Редагувати дані"
          severity="secondary"
          small
          :to="{ name: 'user-edit', params: { id: row.id } }"
        />
        <AppButton label="Видалити учасника" severity="danger" small @click="emit('remove', row)" />
      </div>
    </template>
  </AppTable>
</template>

<style scoped lang="scss">
.users-table__number {
  color: var(--app-text-muted);
}

.users-table__name {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: inherit;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--bs-primary);
  }
}
</style>
