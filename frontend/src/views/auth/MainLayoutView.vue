<script setup>
const authRoutes = [
  { id: 1, name: 'register', text: 'Crea una nueva cuenta' },
  { id: 2, name: 'login', text: 'Accede a tu cuenta' },
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-10">
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-end lg:space-y-0 lg:gap-3"
    >
      <RouterLink
        v-for="route in authRoutes"
        :key="route.id"
        :to="{ name: route.name }"
        :class="[
          'uppercase font-semibold text-sm py-3 px-6 rounded-lg shadow-md transition-all duration-300',
          route.name === 'register'
            ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg',
        ]"
      >
        {{ route.text }}
      </RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
