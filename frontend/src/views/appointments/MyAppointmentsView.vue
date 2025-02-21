<script setup>
import { useUserStore } from '@/stores/user.js'
import SingleAppointment from '@/components/appointments/SingleAppointment.vue'

const userStore = useUserStore()
</script>

<template>
  <h2 class="text-4xl font-bold">Mis reservas</h2>

  <p v-if="userStore.loading" class="text-emerald-500 text-2xl text-center mt-5">Cargando...</p>
  <div v-else>
    <p v-if="userStore.noAppointments" class="text-base text-2xl text-center mt-5">
      No tienes citas agendadas
    </p>

    <div v-else class="grid grid-cols-1 gap-5 mt-10 space-y-4">
      <SingleAppointment
        v-for="appointment in userStore.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>
</template>
