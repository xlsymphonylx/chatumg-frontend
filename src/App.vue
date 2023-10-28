<template>
  <div>
    <template v-if="isLoggedIn">
      <AuthenticatedLayout>
        <!-- Add authenticated views here using <RouterView /> -->
      </AuthenticatedLayout>
    </template>
    <template v-else>
      <AuthLayout>
        <!-- Add login view here using <RouterView /> -->
      </AuthLayout>
    </template>
  </div>
</template>

<script>
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  components: {
    AuthenticatedLayout,
    AuthLayout
  },
  computed: {
    isLoggedIn() {
      const token = localStorage.getItem('token') // Assuming you store the token in localStorage
      console.log(token)

      return !!token // Return true if token exists, false otherwise
    }
  }
}
</script>
