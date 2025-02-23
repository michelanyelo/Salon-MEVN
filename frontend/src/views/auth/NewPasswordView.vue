<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiAuth from '@/api/apiAuth.js'
import useToastNotification from '@/composable/useToast.js'
import { reset } from '@formkit/vue'

const router = useRouter()
const route = useRoute()
const { token } = route.params

const { makeToast } = useToastNotification()

const validToken = ref(false)
const lifeTime = 5000

onMounted(async () => {
  try {
    const { data } = await apiAuth.verifyPasswordResetToken(token)
    validToken.value = true
    makeToast('success', 'Validación exitosa', data.msg, lifeTime)
  } catch (error) {
    makeToast('error', 'Error en la validación', error.response.data.msg, lifeTime)
    setTimeout(() => {
      router.push({ name: 'login' })
    }, lifeTime)
  }
})

const handleSubmit = async ({ password }) => {
  try {
    const { data } = await apiAuth.updatePassword(token, { password })
    makeToast('success', 'Nueva contraseña', data.msg, lifeTime)
    reset('new-password')
    setTimeout(() => {
      router.push({ name: 'login' })
    }, lifeTime)
  } catch (error) {
    makeToast('error', 'Error al establecer la nueva contraseña', error.response.data.msg, lifeTime)
  }
}
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-semibold text-center mt-10 my-5 mb-10">Cambiar contraseña</h1>

    <FormKit
      type="form"
      id="new-password"
      submit-label="Cambiar contraseña"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa las notificaciones"
      @submit="handleSubmit"
    >
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

      <FormKit type="submit" label="Cambiar contraseña" />
    </FormKit>
  </div>
</template>

<style scoped></style>
