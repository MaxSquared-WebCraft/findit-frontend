import * as axios from 'axios'

export default class BaseApi {

  base = null
  token = null

  initApi = (base) => this.base = base

  setToken = (token) => this.token = token

  _baseRequest = async ({ method, endpoint, data, headers }) => {
    try {

      const { data: res } = await axios({
        url: this.base + endpoint,
        method,
        data,
        headers: {
          'Authorization': this.token,
          ...headers,
        },
      })

      return res

    } catch(err) {

      const {
        response: {
          data: {
            error: {
              code = false, message = false,
            } = {},
          } = {},
        } = {},
      } = err

      throw code && message ?
        new Error(`[${code}]: ${message}`) :
        new Error(`[0000]: ${err}`)
    }
  }


  _apiRequest = (method, endpoint, data) => {
    let token = localStorage.getItem('token')
    const headers = { 'Authorization': token }
    return this._baseRequest({ method, endpoint, data, headers })
  }

  _file = (endpoint, data) =>{

    const form = new FormData()

    Object.keys(data).forEach((key)=>{
      form.append(key, data[key])
    })

    return this._apiRequest('post', endpoint, form)
  }

  _get = (endpoint, data) => (
    this._apiRequest('get', endpoint, data)
  )

  _post = (endpoint, data) => (
    this._apiRequest('post', endpoint, data)
  )

  _put = (endpoint, data) => (
    this._apiRequest('put', endpoint, data)
  )

  _patch = (endpoint, data) => (
    this._apiRequest('patch', endpoint, data)
  )

  _delete = (endpoint, data) => (
    this._apiRequest('delete', endpoint, data)
  )

}
