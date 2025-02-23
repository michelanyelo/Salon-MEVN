// useSweetAlert.js
import Swal from 'sweetalert2'

export function useSweetAlert() {
  // Función genérica para mostrar mensajes flash
  function flash(message, type = 'success') {
    const title = type === 'error' ? 'Oops...' : 'Success!'
    return Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'OK',
    })
  }

  // Función genérica para mostrar diálogos de confirmación
  function confirm(options = {}) {
    const {
      title = '¿Estás seguro?',
      text = 'Esta acción no se puede deshacer.',
      confirmButtonText = 'Sí, continuar',
      cancelButtonText = 'Cancelar',
      icon = 'warning',
    } = options

    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonColor: '#2BC792',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText,
    })
  }

  return {
    flash,
    confirm,
  }
}
