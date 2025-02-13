<script setup>
import { formatCurrency } from '@/helpers/index.js'

defineProps({
  service: Object,
})
</script>

<template>
  <div
    class="p-5 space-y-5 rounded-lg cursor-pointer bg-gray-50 border border-transparent hover:border-1 hover:border-emerald-500 transition duration-150"
  >
    <p class="text-lg font-light">{{ service.name }}</p>
    <p class="text-xl text-emerald-500!">{{ formatCurrency(service.price) }}</p>
  </div>
</template>

<style scoped></style>
