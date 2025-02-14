import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppointmentStore = defineStore('appointments', () => {
  const services = ref([])

  function onServiceSelected(selected, flash) {
    if (services.value.some((selectedService) => selectedService._id === selected._id)) {
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== selected._id,
      )
    } else {
      if (services.value.length >= 2) {
        flash('Máximo 2 reservas por agenda', 'error')
        return
      }
      services.value.push(selected)
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id)
  })

  return {
    services,
    onServiceSelected,
    isServiceSelected,
  }
})
