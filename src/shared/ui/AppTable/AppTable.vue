<script setup lang="ts" generic="T extends object">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import type { SortOrder } from '@/shared/api'
import type { TableColumn } from './types'

// Таблиця працює в режимі "lazy": сортування виконує сервер (через query-параметри),
// компонент лише показує стрілку і повідомляє про клік по заголовку.
// Вміст клітинки можна передати через слот cell-<key>
defineProps<{
  rows: T[]
  columns: TableColumn[]
  sortField?: string | null
  sortOrder?: SortOrder
}>()

const emit = defineEmits<{
  sort: [field: string]
}>()

function cellValue(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key]
}
</script>

<template>
  <DataTable
    :value="rows"
    data-key="id"
    lazy
    :sort-field="sortField ?? undefined"
    :sort-order="sortOrder === 'desc' ? -1 : 1"
    @sort="emit('sort', String($event.sortField))"
  >
    <Column
      v-for="column in columns"
      :key="column.key"
      :field="column.key"
      :header="column.header"
      :sortable="column.sortable"
    >
      <template #body="{ data, index }">
        <slot :name="`cell-${column.key}`" :row="data as T" :index="index">
          {{ cellValue(data as T, column.key) }}
        </slot>
      </template>
    </Column>
  </DataTable>
</template>
