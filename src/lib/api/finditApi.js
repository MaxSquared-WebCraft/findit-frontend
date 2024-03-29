import BaseApi from './base'

export default new class FinditApi extends BaseApi {

  login = (userdata) => {
    return this._post('login', userdata)
  }

  upload = (formData) => {
    return this._post('file', formData)
  }

  getFiles = (userId) => {
    return this._get(`file/${userId}`)
  }

  findFiles = (search) => {
    return this._get(`search?text=${search}`)
  }

}()