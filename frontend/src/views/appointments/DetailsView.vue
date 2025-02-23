<script setup>
import SelectedComp from '@/components/services/SelectedComp.vue'
import { useAppointmentStore } from '@/stores/appointments.js'
import { formatCurrency } from '@/helpers/index.js'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const appointments = useAppointmentStore()

// Función para deshabilitar fechas anteriores a hoy
const disablePastDates = (date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  // Deshabilitar días anteriores a hoy y sábados
  return date < today || date.getDay() === 0
}
</script>

<template>
  <h2 class="text-4xl font-bold">Reservas</h2>
  <p class="text-lg mt-5 text-base">A continuación elige al menos un servicio para tu cita</p>
  <p v-if="appointments.noServicesSelected" class="text-red-500 text-2xl">
    No hay servicios seleccionados
  </p>
  <div v-else class="bg-white rounded-lg shadow-md">
    <div class="bg-gray-50 w-full px-4 py-8">
      <h2 class="text-2xl font-bold text-gray-800">Resumen de la reserva</h2>
      <p class="text-lg text-gray-600">Estás reservando en Quillota</p>
    </div>
    <div class="p-4">
      <h4 class="text-lg font-semibold text-gray-700 mb-4">1. Variante del servicio</h4>
      <div class="space-y-4">
        <SelectedComp
          v-for="service in appointments.services"
          :key="service._id"
          :service="service"
        />
      </div>
      <div class="mt-6 p-4 border-t border-gray-200 flex justify-between">
        <p class="text-sm text-gray-700">Sub total servicios agregados</p>
        <p class="font-semibold text-emerald-500">
          {{ formatCurrency(appointments.totalAmount) }}
        </p>
      </div>
      <div class="mt-5 border-t border-gray-200">
        <h4 class="text-lg font-semibold text-gray-700 my-4">2. Disponibilidad</h4>
        <div class="lg:flex gap-5 items-start">
          <!-- DatePicker -->
          <div class="w-full lg:w-120 bg-white flex justify-center rounded-lg">
            <!--            <DatePicker-->
            <!--              v-model="appointments.date"-->
            <!--              inline-->
            <!--              :disabled-date="disablePastDates"-->
            <!--              class="w-full max-w-full"-->
            <!--              :disabled-days="[0]"-->
            <!--              :min-date="new Date()"-->
            <!--            />-->

            <VueDatePicker
              v-model="appointments.date"
              inline
              auto-apply
              locale="es"
              :min-date="new Date()"
              :disabled-week-days="[0]"
            />
          </div>
          <div
            v-show="appointments.isDateSelected"
            class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0"
          >
            <!-- Botones de horas -->
            <button
              type="button"
              v-for="hour in appointments.hours"
              :key="hour"
              class="rounded-sm py-2 px-6 focus:outline-none font-semibold hover:cursor-pointer transition-all duration-300 border-2 text-center disabled:bg-gray-900 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              :class="
                appointments.time === hour
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'bg-gray-50 border-transparent text-emerald-500 hover:border-emerald-500 hover:bg-emerald-50'
              "
              :disabled="appointments.disableTime(hour)"
              @click="appointments.time = hour"
            >
              {{ hour }}
            </button>
            <!-- Botón Reservar -->
            <button
              class="lg:mt-4 col-span-full bg-emerald-600 p-3 rounded-lg uppercase font-semibold text-white w-full hover:cursor-pointer hover:bg-emerald-700 transition duration-300"
              v-if="appointments.isValidReservation"
              @click="appointments.saveAppointment"
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.dp__active_date) {
  background-color: #42b883 !important;
  color: white !important;
  border-color: #42b883 !important;
}

:deep(.dp__main) {
  display: block;
}

</style>
