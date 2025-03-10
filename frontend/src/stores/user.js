import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiAuth from '@/api/apiAuth.js'
import { useRouter } from 'vue-router'
import AppointmentAPI from '@/api/AppointmentAPI.js'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref({})
  const userAppointments = ref([])
  const loading = ref(true)

  async function fetchUser() {
    try {
      const { data } = await apiAuth.auth()
      user.value = data
      await getUserAppointments()
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      loading.value = false
    }
  }

  async function getUserAppointments() {
    const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
    userAppointments.value = data
  }

  async function logout() {
    localStorage.removeItem('AUTH_TOKEN')
    user.value = {}
    await router.push({ name: 'login' })
  }

  const getUserName = computed(() => user.value?.name || '')

  const noAppointments = computed(() => userAppointments.value.length === 0)

  return {
    user,
    getUserName,
    logout,
    fetchUser,
    getUserAppointments,
    userAppointments,
    noAppointments,
    loading,
  }
})
