import { ref, reactive, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useAppointmentStore = defineStore('appointments', () => {
  const services = ref([])
  const date = ref(new Date())
  const hours = ref([])
  const time = ref('')

  onMounted(() => {
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

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

  function createAppointment() {
    const appointment = {
      services: services.value.map(service => service._id),
      date: formattedDate.value,
      time: time.value,
      totalAmount: totalAmount.value
    }

    console.log(appointment);
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id)
  })

  const noServicesSelected = computed(() => services.value.length === 0)

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date.value)
  })

  const isValidReservation = computed(() => {
    // Verificar que haya servicios seleccionados
    const hasServices = services.value.length > 0

    // Verificar que la fecha sea válida
    const isDateValid = date.value instanceof Date && !isNaN(date.value)

    // Verificar que se haya seleccionado una hora
    const isTimeSelected = !!time.value // Convierte a booleano para asegurar que no sea null/undefined

    // La reserva es válida solo si todos los criterios son verdaderos
    return hasServices && isDateValid && isTimeSelected
  })

  return {
    services,
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    date,
    hours,
    time,
    formattedDate,
    isValidReservation,
  }
})
