import api from '@/libs/axios.js'

export default {
  register(data) {
    return api.post('/auth/register', data)
  },
}
