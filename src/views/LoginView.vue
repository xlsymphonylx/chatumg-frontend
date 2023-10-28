<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Iniciar Sesión</h1>
            <form @submit.prevent="login">
              <div class="field">
                <label class="label">Usuario</label>
                <div class="control">
                  <input v-model="username" class="input" type="text" placeholder="Usuario" />
                </div>
              </div>
              <div class="field">
                <label class="label">Contraseña</label>
                <div class="control">
                  <input
                    v-model="password"
                    class="input"
                    type="password"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button type="submit" class="button is-primary">Iniciar Sesión</button>
                </div>
                <div class="control">
                  <router-link to="/registrarse" class="button is-info">Registrarse</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import authService from '../services/authService' // Replace with actual path
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await authService.login(username.value, password.value)
    const { token } = response

    // Save token to localStorage
    localStorage.setItem('token', token)

    // Redirect to home page
    // Assuming you're using Vue Router, replace 'home' with the actual route name for your home page
    router.push({ path: 'home' })
    router.go()
  } catch (error) {
    // Handle login errors here
    console.error(error.message)
  }
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 2em;
}

.button {
  font-size: 1em;
}
</style>
