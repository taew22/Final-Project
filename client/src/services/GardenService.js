import Api from '@/services/Api'

export default {
  index () {
    return Api().get('gardens')
  },
  show (gardenId) {
    return Api().get('garden/'+gardenId)
  },
  post (garden) {
    return Api().post('garden',garden)
  },
  put (garden) {
    return Api().put('garden/'+garden.id, garden)
  },
  delete (garden) {
    return Api().delete('garden/'+garden.id, garden)
  },
}
