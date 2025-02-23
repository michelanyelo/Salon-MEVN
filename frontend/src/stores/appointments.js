import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import AppointmentAPI from '@/api/AppointmentAPI.js' // Importa la API para manejar citas
import { convertToDate, convertToISO } from '@/helpers/index.js' // Funciones auxiliares para fechas
import useToastNotification from '@/composable/useToast.js' // Notificaciones toast
import { useUserStore } from '@/stores/user.js' // Store del usuario
import { useSweetAlert } from '@/composable/useSwal'

export const useAppointmentStore = defineStore('appointments', () => {
  const router = useRouter() // Hook para manejar la navegación
  const { makeToast } = useToastNotification() // Hook para mostrar notificaciones
  const userStore = useUserStore()
  const services = ref([]) // Servicios seleccionados por el usuario
  const date = ref(new Date()) // Fecha seleccionada
  const hours = ref([]) // Horas disponibles para reservar
  const time = ref('') // Hora seleccionada
  const lifeTime = 4000 // Duración de las notificaciones en milisegundos
  const appointmentsByDate = ref([]) // Citas disponibles para la fecha seleccionada
  const appointmentById = ref('') // ID de la cita que se está editando

  // Al montar el componente, genera las horas disponibles (de 10:00 a 19:00)
  onMounted(() => {
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00')
    }
  })

  // Observador que se ejecuta cuando cambia la fecha seleccionada
  watch(date, async () => {
    time.value = '' // Reinicia la hora seleccionada
    try {
      const { data } = await AppointmentAPI.getByDate(formattedDate.value) // Obtiene las citas para la fecha seleccionada
      if (appointmentById.value) {
        // Filtra las citas para excluir la que tiene el ID coincidente
        appointmentsByDate.value = data.filter(
          (appointment) => appointment._id !== appointmentById.value,
        )
        // Encuentra la cita con el ID coincidente
        const matchingAppointment = data.find(
          (appointment) => appointment._id === appointmentById.value,
        )
        // Establece la hora solo si existe una cita coincidente
        if (matchingAppointment) {
          time.value = matchingAppointment.time
        } else {
          time.value = '' // Si no hay coincidencias, reinicia la hora seleccionada
        }
      } else {
        // Si no hay un ID de cita específico, establece todas las citas disponibles
        appointmentsByDate.value = data
      }
    } catch (error) {
      console.error('Error al obtener las citas:', error)
    }
  })

  // Función para manejar la selección/deselección de servicios
  async function onServiceSelected(selected) {
    if (services.value.some((selectedService) => selectedService._id === selected._id)) {
      // Si el servicio ya está seleccionado, lo elimina
      services.value = services.value.filter(
        (selectedService) => selectedService._id !== selected._id,
      )
    } else {
      // Si no está seleccionado, lo agrega (máximo 2 servicios)
      if (services.value.length >= 2) {
        const { flash } = useSweetAlert()
        await flash('Máximo 2 reservas por agenda'.toUpperCase(), 'error') // Muestra un mensaje de error
        return
      }
      services.value.push(selected)
    }
  }

  // Función para cargar los datos de una cita existente al editarla
  function setSelectedAppointment(appointment) {
    services.value = appointment.services // Carga los servicios
    date.value = convertToDate(appointment.date) // Convierte la fecha al formato adecuado
    time.value = appointment.time // Establece la hora
    appointmentById.value = appointment._id // Guarda el ID de la cita
  }

  // Función para guardar o actualizar una cita
  async function saveAppointment() {
    const appointment = {
      services: services.value.map((service) => service._id), // IDs de los servicios seleccionados
      date: convertToISO(formattedDate.value), // Fecha en formato ISO
      time: time.value, // Hora seleccionada
      totalAmount: totalAmount.value, // Total del monto calculado
    }

    if (appointmentById.value) {
      // Si hay un ID de cita, actualiza la cita existente
      try {
        const { data } = await AppointmentAPI.update(appointmentById.value, appointment)
        makeToast(
          'success',
          'Reserva actualizada',
          `${userStore.getUserName}, ${data.msg}`,
          lifeTime,
        )
      } catch {
        makeToast(
          'error',
          'Error en la actualización',
          'Tu reserva no se ha podido procesar',
          lifeTime,
        )
      }
    } else {
      // Si no hay un ID de cita, crea una nueva cita
      try {
        const { data } = await AppointmentAPI.create(appointment)
        makeToast('success', 'Reserva agendada', `${userStore.getUserName}, ${data.msg}`, lifeTime)
      } catch {
        makeToast('error', 'Error en la reserva', 'Tu reserva no se ha podido procesar', lifeTime)
      }
    }

    // Redirige al usuario después de un tiempo determinado
    setTimeout(() => {
      clearAppointmentData() // Limpia los datos de la cita
      userStore.getUserAppointments() // Actualiza las citas del usuario
      router.push({ name: 'my-appointments' }) // Navega a la página de "Mis Citas"
    }, lifeTime)
  }

  // Función para limpiar los datos de la cita
  function clearAppointmentData() {
    services.value = [] // Limpia los servicios seleccionados
    date.value = new Date() // Restablece la fecha
    time.value = '' // Limpia la hora seleccionada
    appointmentById.value = '' // Limpia el ID de la cita
  }

  async function deleteAppointment(id) {
    const { confirm } = useSweetAlert()
    const result = await confirm({
      title: '¿Estás seguro?',
      text: '¿Deseas cancelar esta reserva? Esta acción no se puede deshacer.',
      confirmButtonText: 'Sí, cancelar reserva',
      cancelButtonText: 'Cancelar',
    })
    if (result.isConfirmed) {
      try {
        const { data } = await AppointmentAPI.delete(id)

        makeToast(
          'success',
          'Reserva eliminada correctamente',
          `${userStore.getUserName}, ${data.msg}`,
          lifeTime,
        )

        userStore.userAppointments = userStore.userAppointments.filter(
          (appointment) => appointment._id !== id,
        )
      } catch (error) {
        makeToast(
          'error',
          'Error al eliminar reserva',
          `${userStore.getUserName}, ${error.response.data.msg}`,
          lifeTime,
        )
      }
    }
  }

  // Computed property para verificar si un servicio está seleccionado
  const isServiceSelected = computed(() => {
    return (id) => services.value.some((service) => service._id === id)
  })

  // Computed property para verificar si no hay servicios seleccionados
  const noServicesSelected = computed(() => services.value.length === 0)

  // Computed property para calcular el monto total de los servicios seleccionados
  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  // Computed property para verificar si la reserva es válida
  const isValidReservation = computed(() => {
    const hasServices = services.value.length > 0 // Verifica que haya servicios seleccionados
    const isDateValid = date.value instanceof Date && !isNaN(date.value) // Verifica que la fecha sea válida
    const isTimeSelected = !!time.value // Verifica que se haya seleccionado una hora
    return hasServices && isDateValid && isTimeSelected // La reserva es válida solo si todos los criterios son verdaderos
  })

  // Computed property para formatear la fecha seleccionada
  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
      .format(date.value)
      .replace(/-/g, '/') // Reemplaza guiones por barras
  })

  // Computed property para verificar si se ha seleccionado una fecha
  const isDateSelected = computed(() => {
    return !!date.value
  })

  // Computed property para deshabilitar horas ocupadas
  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find((singleAppointment) => singleAppointment.time === hour)
    }
  })

  // Retorna las propiedades y funciones que serán accesibles desde el store
  return {
    services,
    onServiceSelected,
    setSelectedAppointment,
    saveAppointment,
    clearAppointmentData,
    deleteAppointment,
    isServiceSelected,
    noServicesSelected,
    totalAmount,
    date,
    hours,
    time,
    isValidReservation,
    isDateSelected,
    disableTime,
  }
})
