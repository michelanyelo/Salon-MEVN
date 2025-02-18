import { useToast } from 'primevue/usetoast'

// Composable para manejar notificaciones
export default function useToastNotification() {
  const toast = useToast()

  // Función para mostrar una notificación
  const makeToast = (severity, summary, detail, lifeTime) => {
    toast.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: lifeTime || 5000,
    })
  }

  return { makeToast }
}
