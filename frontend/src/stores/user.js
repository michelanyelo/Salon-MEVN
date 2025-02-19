import { defineStore } from 'pinia'
import {ref, computed, onMounted} from 'vue'
import apiAuth from '@/api/apiAuth.js'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref({})

  onMounted(async () => {
    await fetchUser()
  })

  async function fetchUser() {
    try {
      const { data } = await apiAuth.auth()
      user.value = data
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  function logout() {
    localStorage.removeItem('AUTH_TOKEN')
    user.value = {}
    router.push({ name: 'login' })
  }

  const getUserName = computed(() => user.value?.name || '')

  return {
    user,
    getUserName,
    logout,
  }
})
