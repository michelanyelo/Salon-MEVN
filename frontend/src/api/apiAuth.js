import api from '@/libs/axios.js'

export default {
  register(data) {
    return api.post('/auth/register', data)
  },
  verifyAccount(token) {
    return api.get(`/auth/verify/${token}`)
  },
  login(data) {
    return api.post('/auth/login', data)
  },
  auth() {
    const token = localStorage.getItem('AUTH_TOKEN')
    return api.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  },
}
