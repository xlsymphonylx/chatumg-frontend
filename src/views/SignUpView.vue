<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Registrarse</h1>
            <form @submit.prevent="registerUser">
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
                  <button type="submit" class="button is-primary">Registrarse</button>
                </div>
                <div class="control">
                  <router-link to="/iniciar-sesion" class="button is-info"
                    >Iniciar Sesión</router-link
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.title {
  font-size: 2em;
}

.button {
  font-size: 1em;
}
</style>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService';
const router = useRouter()

const username = ref('')
const password = ref('')

const registerUser = async () => {
  try {
    const response = await authService.register(username.value, password.value)
    const { token } = response
    localStorage.setItem('token', token)
    router.push({ path: 'home' })
    router.go()
  } catch (error) {
    console.error(error.message)
  }
}
</script>
