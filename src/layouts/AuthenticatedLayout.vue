<template>
  <div class="container">
    <div class="columns">
      <!-- Sidebar -->
      <div class="column is-3">
        <!-- Create Group Form -->
        <div class="box">
          <h4 class="title is-4">Create Group</h4>
          <form @submit.prevent="createGroupLocal">
            <div class="field">
              <label class="label">Group Name</label>
              <div class="control">
                <input v-model="newGroup.name" class="input" type="text" required />
              </div>
            </div>
            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea v-model="newGroup.description" class="textarea"></textarea>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-primary">Create</button>
            </div>
          </form>
        </div>

        <!-- Available Groups -->
        <div class="box">
          <h4 class="title is-4">Available Groups</h4>
          <ul>
            <li v-for="group in groups" :key="group.id">
              {{ group.name }}
              <button @click="joinGroup(group.id)" class="button is-link is-small">Join</button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main Chat Section -->
      <div class="column is-9">
        <!-- Display Group Messages -->
        <div class="box">
          <h4 class="title is-4">Group Messages</h4>
          <ul>
            <li v-for="message in messages" :key="message.id">
              {{ message.text }}
            </li>
          </ul>
        </div>
        <div class="box">
          <form @submit.prevent="sendGroupMessageLocal">
            <div class="field">
              <div class="control">
                <textarea v-model="newMessage" class="textarea" required></textarea>
              </div>
            </div>
            <div class="control">
              <button type="submit" class="button is-primary">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import io from 'socket.io-client'
import {
  getAllGroups,
  createGroup,
  getAllGroupMessages,
  createGroupMessage
} from '@/services/chatService'
const token = localStorage.getItem('token')
const socket = io('http://localhost:3000', {
  extraHeaders: {
    Authorization: `Bearer ${token}`
  }
})

// Data
const newGroup = reactive({ name: '', description: '' })
const groups = ref([])
const messages = ref([])
const newMessage = ref('')
const selectedGroup = ref(null)
// Add an event listener for receiving group messages
onMounted(() => {
  socket.on('groupMessage', (message) => {
    messages.value.push(message)
  })
})

// Methods
function createGroupLocal() {
  createGroup(newGroup.name, newGroup.description)
    .then((group) => {
      groups.value.push(group)
      newGroup.name = ''
      newGroup.description = ''
    })
    .catch((error) => {
      console.error(error)
    })
}

function joinGroup(groupId) {
  selectedGroup.value = groups.value.find((group) => group.id === groupId)

  // Load group messages after selecting a group
  loadGroupMessages(groupId)
}
function loadGroupMessages(groupId) {
  getAllGroupMessages(groupId)
    .then((messages) => {
      messages.value = messages
    })
    .catch((error) => {
      console.error(error)
    })
}
const loadGroups = () => {
  getAllGroups()
    .then((fetchedGroups) => {
      groups.value = fetchedGroups
    })
    .catch((error) => {
      console.error(error)
    })
}
function sendGroupMessageLocal() {
  if (newMessage.value.trim() !== '') {
    sendGroupMessage(selectedGroup.value.id, newMessage.value)
    newMessage.value = ''
  }
}
// Function to send a group message
const sendGroupMessage = (groupId, message) => {
  createGroupMessage({ groupId, message })
    .then((groupMessage) => {
      messages.value.push(groupMessage)
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(() => {
  socket.on('groupMessage', (message) => {
    messages.value.push(message)
  })

  // Load groups when component is mounted
  loadGroups()
})
</script>

<style>
/* Add your custom styles here */
</style>
