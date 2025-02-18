<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import apiAuth from '@/api/apiAuth.js'
import useToastNotification from '@/composable/useToast.js'

const route = useRoute()
const { token } = route.params

const router = useRouter()

const { makeToast } = useToastNotification()
const lifeTime = 5000

onMounted(async () => {
  try {
    const { data } = await apiAuth.verifyAccount(token)
    makeToast('success', 'Validación exitosa', data.msg, lifeTime)

    setTimeout(() => {
      router.push({ name: 'login' })
    }, lifeTime)
  } catch (error) {
    makeToast('error', 'Error en la validación', error.response.data.msg, lifeTime)
  }
})
</script>

<template>
  <div>
    <h1 class="text-6xl font-semibold text-center mt-10">Verificar cuenta</h1>
  </div>
</template>

<style scoped></style>
