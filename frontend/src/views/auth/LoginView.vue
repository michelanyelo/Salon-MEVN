<script setup>
import apiAuth from '@/api/apiAuth.js'
import useToastNotification from '@/composable/useToast.js'

const { makeToast } = useToastNotification()

const handleSubmit = async (formData) => {
  try {
    const {
      data: { token },
    } = await apiAuth.login(formData)
    localStorage.setItem('AUTH_TOKEN', token)
  } catch (error) {
    makeToast('error', 'Error al autenticarse', error.response.data.msg)
  }
}
</script>

<template>
  <h1 class="text-6xl font-semibold text-center mt-10">Inicia sesión en tu cuenta</h1>
  <p class="text-2xl text-center my-5 mb-10 text-base">
    <span class="text-emerald-500 font-bold">Dale tu Corte</span> y accede a nuestros servicios para
    reservar tu cita
  </p>
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
      name="email"
      label="Tu correo electrónico"
      placeholder="juan@example.com"
      help="¿Qué correo electrónico registraste?"
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
      validation="required"
      :validation-messages="{
        required: 'Este campo es obligatorio',
      }"
      placeholder="Tu contraseña"
      help="Usa tu contraseña"
    />

    <FormKit type="submit" label="Iniciar sesión" />
  </FormKit>
</template>

<style scoped></style>
