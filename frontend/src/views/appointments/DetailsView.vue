<script setup>
import SelectedComp from '@/components/services/SelectedComp.vue'
import { useAppointmentStore } from '@/stores/appointments.js'

const appointments = useAppointmentStore()
</script>

<template>
  <h2 class="text-4xl font-bold">Reservas</h2>
  <p class="text-lg mt-5 text-base">A continuación elige al menos un servicio para tu cita</p>

  <div class="bg-white rounded-lg shadow-md">
    <div class="bg-gray-50 w-full px-4 py-8">
      <h2 class="text-2xl font-bold text-gray-800">Resumen de la reserva</h2>
      <p class="text-lg text-gray-600">Estás reservando en Quillota</p>
    </div>

    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Servicios a reservar</h3>
      <div class="space-y-4">
        <SelectedComp
          v-for="service in appointments.services"
          :key="service._id"
          :service="service"
        />
      </div>

<!--      <div class="mt-6 pt-4 border-t border-gray-200">-->
<!--        <p class="text-lg text-gray-700">Sub total servicios agregados</p>-->
<!--        <p class="text-xl font-bold text-green-600">$29.000 CLP</p>-->
<!--      </div>-->

<!--      <div class="mt-6 pt-4 border-t border-gray-200">-->
<!--        <p class="text-lg text-gray-700">¿Tienes algún código de descuento?</p>-->
<!--        <input-->
<!--          type="text"-->
<!--          class="mt-2 p-2 border border-gray-300 rounded-md"-->
<!--          placeholder="Ingresa tu código"-->
<!--        />-->
<!--        <button class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">-->
<!--          Validar-->
<!--        </button>-->
<!--      </div>-->

<!--      <div class="mt-6 pt-4 border-t border-gray-200">-->
<!--        <p class="text-xl font-bold text-gray-800">Total</p>-->
<!--        <p class="text-2xl font-bold text-green-600">$29.000 CLP</p>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped></style>
