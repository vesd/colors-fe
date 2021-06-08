import Api from '@/services/Api'

export default {
  index () {
    return Api().get('/api/colors')
  },
  post (color) {
    return Api().post('/api/colors', color)
  },
  delete (colorId) {
    return Api().delete(`/api/colors/${colorId}`)
  }
}
