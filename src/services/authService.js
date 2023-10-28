import axios from 'axios'

const authService = {
  async register(username, password) {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password
      })
      return response.data
    } catch (error) {
      if (error.response.status === 400) {
        throw new Error('Nombre de usuario ya existe')
      } else if (error.response.status === 500) {
        throw new Error('Error interno del servidor')
      } else {
        throw new Error('Error de registro')
      }
    }
  },

  async login(username, password) {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      })
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error('Usuario o contraseña incorrectos')
      } else if (error.response.status === 500) {
        throw new Error('Error interno del servidor')
      } else {
        throw new Error('Error de inicio de sesión')
      }
    }
  }
}

export default authService
