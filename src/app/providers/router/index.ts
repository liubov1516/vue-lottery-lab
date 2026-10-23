import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { setupGuards } from './guards'

// Усі сторінки завантажуються ліниво: код сторінки скачується лише при переході на неї
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home').then((m) => m.HomePage),
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about').then((m) => m.AboutPage),
    meta: { title: 'About author' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login').then((m) => m.LoginPage),
    meta: { title: 'Login', layout: 'auth', guestOnly: true },
  },
  {
    // Батьківський маршрут без компонента: лише спільна частина шляху і meta
    path: '/users',
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('@/pages/users').then((m) => m.UsersPage),
        meta: { title: 'Users' },
      },
      {
        path: 'new',
        name: 'user-create',
        component: () => import('@/pages/user-create').then((m) => m.UserCreatePage),
        meta: { title: 'New user' },
      },
      {
        // (\\d+): id складається лише з цифр, тому /users/new сюди не потрапить
        path: ':id(\\d+)',
        name: 'user-details',
        component: () => import('@/pages/user-details').then((m) => m.UserDetailsPage),
        // Параметр id передається в компонент як проп
        props: true,
        meta: { title: 'User details' },
        children: [
          {
            // Вкладений маршрут: форма показується всередині сторінки користувача
            path: 'edit',
            name: 'user-edit',
            component: () => import('@/pages/user-edit').then((m) => m.UserEditPage),
            props: true,
            meta: { title: 'Edit user' },
          },
        ],
      },
    ],
  },
  {
    // Catch-all: усі інші адреси
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found').then((m) => m.NotFoundPage),
    meta: { title: 'Page not found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Клас Bootstrap для активного пункту меню
  linkActiveClass: 'active',
  scrollBehavior: () => ({ top: 0 }),
})

setupGuards(router)

export default router
