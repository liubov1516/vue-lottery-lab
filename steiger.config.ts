import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

// Лінтер правил Feature-Sliced Design: напрямок залежностей, Public API, глибокі імпорти.
// Порушення цих правил (fsd/forbidden-imports, fsd/public-api, fsd/no-public-api-sidestep) є помилками
export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Склад слайсів задано завданням лабораторної (AppHeader, UsersTable, theme-toggle),
    // тому "незначущі" слайси з одним споживачем не зливаємо
    files: ['./src/widgets/**', './src/features/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
  {
    // app/providers - назва з методології FSD та завдання (router, services, ui)
    files: ['./src/app/providers/**'],
    rules: {
      'fsd/segments-by-purpose': 'off',
    },
  },
])
