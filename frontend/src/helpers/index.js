import { parse, formatISO } from 'date-fns'

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
