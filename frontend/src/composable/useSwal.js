import Swal from 'sweetalert2'

export function useFlash() {
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

  return {
    flash,
  }
}
