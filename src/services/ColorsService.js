import Api from '@/services/Api'

export default {
  index () {
    return Api().get('colors')
  },
  post (color) {
    return Api().post('colors', color)
  },
  delete (colorId) {
    return Api().delete(`colors/${colorId}`)
  }
}
