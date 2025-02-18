<script setup>
import { inject } from 'vue'
import apiAuth from '@/api/apiAuth.js'
import { useToast } from 'primevue/usetoast'

// Obtener el servicio Toast
const toast = useToast()

// Inyectar la función global
const $toastNotification = inject('toast')

const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await apiAuth.register(formData)
    $toastNotification({
      toast,
      severity: 'success',
      summary: 'Registro exitoso',
      detail: data.msg,
    })
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <h1 class="text-6xl font-semibold text-center mt-10">Crea una nueva cuenta</h1>
  <p class="text-2xl text-center my-5 mb-10">
    <span class="text-emerald-500 font-bold">Dale tu Corte</span> y reserva tu cita en nuestros
    servicios
  </p>
  <button @click="showSuccess">Mostrar éxito</button>
  <FormKit
    type="form"
    id="new-account"
    submit-label="Crear cuenta"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      name="name"
      label="Tu nombre"
      placeholder="Juan Pérez"
      help="¿Cómo te llaman?"
      validation="required|length:6"
      :validation-messages="{
        required: 'Este campo es obligatorio',
        length: 'Debe ser el nombre completo',
      }"
    />
    <FormKit
      type="text"
      name="email"
      label="Tu correo electrónico"
      placeholder="juan@example.com"
      help="¿Qué correo electrónico usas frecuentemente?"
      validation="required|email"
      :validation-messages="{
        required: 'Este campo es obligatorio',
        email: 'Por favor, introduce un correo electrónico válido',
      }"
    />
    <FormKit
      type="password"
      name="password"
      label="Contraseña"
      validation="required|length:8|matches:/[^a-zA-Z]/"
      :validation-messages="{
        required: 'Este campo es obligatorio',
        length: 'La contraseña debe tener al menos 8 caracteres',
        matches: 'Por favor, incluye al menos un símbolo o número',
      }"
      placeholder="Tu contraseña"
      help="Elige una contraseña segura"
    />
    <FormKit
      type="password"
      name="password_confirm"
      label="Confirmar contraseña"
      placeholder="Confirma tu contraseña"
      validation="required|confirm"
      :validation-messages="{
        required: 'Este campo es obligatorio',
        confirm: 'Las contraseñas no coinciden',
      }"
      help="Confirma tu contraseña"
    />
    <FormKit type="submit" label="Crear cuenta" />
  </FormKit>
</template>
<style scoped></style>
