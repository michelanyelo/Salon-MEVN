import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import AppointmentAPI from '@/api/AppointmentAPI.js'
import { convertToISO } from '@/helpers/index.js'
import useToastNotification from '@/composable/useToast.js'
import { useUserStore } from '@/stores/user.js'

export const useAppointmentStore = defineStore('appointments', () => {
  const router = useRouter()
  const { makeToast } = useToastNotification()
  const services = ref([])
  const date = ref()
  const hours = ref([])
  const time = ref('')
  const lifeTime = 5000
  const appointmentsByDate = ref([])

  onMounted(() => {
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

  watch(date, async () => {
    time.value = ''
    const { data } = await AppointmentAPI.getByDate(formattedDate.value)
    appointmentsByDate.value = data
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

  async function createAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id),
      date: convertToISO(formattedDate.value),
      time: time.value,
      totalAmount: totalAmount.value,
    }

    try {
      const { data } = await AppointmentAPI.create(appointment)
      makeToast(
        'success',
        'Reserva agendada',
        `${useUserStore().getUserName}, ${data.msg}`,
        lifeTime,
      )

      setTimeout(() => {
        clearAppointmentData()
        router.push({ name: 'my-appointments' })
      }, lifeTime)
    } catch {
      makeToast('error', 'Error en la reserva', 'Tu reserva no se ha podido procesar', lifeTime)
    }
  }

  function clearAppointmentData() {
    services.value = []
    date.value = new Date()
    time.value = ''
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id)
  })

  const noServicesSelected = computed(() => services.value.length === 0)

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
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

  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
      .format(date.value)
      .replace(/-/g, '/')
  })

  const isDateSelected = computed(() => {
    return !!date.value
  })

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find((singleappointment) => singleappointment.time === hour)
    }
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
    isValidReservation,
    isDateSelected,
    disableTime
  }
})
