import api from '@/libs/axios.js'

export default {
  all() {
    return api.get('/services')
  },
}
