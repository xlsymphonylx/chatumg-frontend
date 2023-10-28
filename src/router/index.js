import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'

function isAuthenticated() {
  const token = localStorage.getItem('token') // Assuming you store the token in localStorage
  return !!token // Return true if token exists, false otherwise
}

const routes = [
  {
    path: '/home',
    component: () => AuthenticatedLayout
  },
  {
    path: '/',
    children: [
      {
        path: '/iniciar-sesion',
        name: 'login',
        component: () => LoginView
      },
      {
        path: '/registrarse',
        name: 'signup',
        component: () => SignUpView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authenticatedRoutes = ['login', 'signup'] // List of routes accessible to authenticated users

  if (authenticatedRoutes.includes(to.name) && isAuthenticated()) {
    // If authenticated user tries to access login or signup
    next({ name: 'home' }) // Redirect to home page or any other authorized route
  } else if (!authenticatedRoutes.includes(to.name) && !isAuthenticated()) {
    // If not authenticated and trying to access a protected route
    next({ name: 'login' }) // Redirect to login page
  } else {
    next() // Continue navigation
  }
})
export default router
