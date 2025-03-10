import { format, formatISO, parse, parseISO } from 'date-fns'
import { es } from 'date-fns/locale/es'

export const formatCurrency = (price) => {
  return Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export const convertToISO = (strDate) => {
  const newDate = parse(strDate, 'dd/MM/yyyy', new Date())
  return formatISO(newDate)
}

// Mostrar fecha desde la bd hacia editar
export const convertToDate = (isoDate) => {
  return new Date(isoDate)
}

export const displayDate = (isoDate) => {
  const newDate = parseISO(isoDate)
  return format(newDate, 'PPPP', { locale: es })
}
