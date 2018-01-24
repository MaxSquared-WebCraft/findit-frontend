import BaseApi from './base'

export default new class FinditApi extends BaseApi {

  login = (userdata) => {
    return this._post('login', userdata)
  }

}()