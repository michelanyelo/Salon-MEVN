<script setup>
import Toast from 'primevue/toast'
</script>

<template>
  <div class="md:flex h-screen">
    <div class="h-64 md:h-screen md:w-1/3 bg-cover bg-center bg-[url(/img/1.jpg)]"></div>
    <div class="md:w-2/3 px-10 py-5 h-screen overflow-y-auto ">
      <Toast position="bottom-right" />
      <RouterView />
    </div>
  </div>
</template>
