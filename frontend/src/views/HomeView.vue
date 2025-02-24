<script setup></script>

<template>
  <div class="md:min-h-screen p-10 md:p-0 flex flex-col items-center justify-center px-4">
    <!-- Hero Section -->
    <div class="text-center max-w-3xl space-y-6">
      <!-- Título principal -->
      <h1 class="text-5xl font-bold text-emerald-600 sm:text-6xl">
        ¡Bienvenido a <span class="text-emerald-800">Dale tu Corte</span>!
      </h1>

      <!-- Subtítulo -->
      <p class="text-xl text-gray-700 sm:text-2xl">
        Encuentra los mejores profesionales cerca de ti y reserva tu cita en minutos.
      </p>

      <!-- Botón de registro -->
      <div class="flex justify-center mt-6">
        <RouterLink
          :to="{ name: 'register' }"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
        >
          Regístrate ahora
        </RouterLink>
      </div>
    </div>
  </div>
</template>
