<script setup></script>

<template>
  <div>
    <h1 class="text-6xl font-semibold text-center mt-10">Restablecer contraseña</h1>
    <p class="text-2xl text-center my-5 mb-10 text-base">
      Introduce tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
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
        placeholder="correo@electronico.com"
        help="¿Qué correo electrónico registraste?"
        validation="required|email"
        :validation-messages="{
          required: 'Este campo es obligatorio',
          email: 'Por favor, introduce un correo electrónico válido',
        }"
      />

      <FormKit type="submit" label="Enviar instrucciones" />
    </FormKit>
  </div>
</template>

<style scoped></style>
