<script setup></script>
<template>
  <div class="flex justify-between bg-white px-6 py-4 rounded-md">
    <!-- Título principal -->
    <h1 class="text-2xl lg:text-6xl font-black uppercase">Dale tu corte</h1>

    <!-- Sección de usuario -->
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center justify-end">
        <p class=" text-right text-base">Hola: usuario</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>

      <!-- Menú de navegación -->
      <nav class="flex gap-2 items-center justify-end">
        <button
          class="p-3 bg-sky-800 hover:bg-sky-900 text-white uppercase text-xs font-bold rounded-lg transition duration-300 hover:cursor-pointer"
        >
          Mis reservas
        </button>
        <RouterLink
          :to="{ name: 'new-appointment' }"
          class="p-3 bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-xs font-bold rounded-lg transition duration-300 inline-block"
        >
          Nueva reserva
        </RouterLink>
      </nav>
    </div>
  </div>

  <!-- Contenido principal -->
  <main class="bg-white min-h-screen text-black px-6 py-8 rounded-md">
    <RouterView />
  </main>
</template>
