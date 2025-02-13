import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import apiServices from '@/api/apiServices.js'

export const useServiceStore = defineStore('service', () => {
  const allServices = ref([])
  onMounted(async () => {
    try {
      const { data } = await apiServices.all()
      allServices.value = data
    } catch (e) {
      console.error(e)
    }
  })

  return {
    allServices
  }
})
