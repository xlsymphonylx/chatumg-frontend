// src/services/chatService.js
import axios from 'axios'

const baseURL = 'http://localhost:3000' // Replace with your backend URL

const chatService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add an interceptor to include the Bearer token from local storage
chatService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getAllGroups = async () => {
  try {
    const response = await chatService.get('/groups')
    console.log(response);
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export const createGroup = async (name, description) => {
  try {
    const response = await chatService.post('/groups', { name, description })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export const getAllGroupMessages = async (groupId) => {
  try {
    const response = await chatService.get(`/groups/${groupId}/messages`)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export const createGroupMessage = async (messageData) => {
  try {
    const response = await chatService.post(`/groups/${messageData.groupId}/messages`, messageData)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error)
  }
}

export default chatService
