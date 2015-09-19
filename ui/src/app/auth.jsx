import Config from './config.jsx'
import jQuery from 'jquery'

class Auth {
  constructor() {
    this.tokenString = '_sssToken'
    this.login()
  }

  login(data, cb) {
    cb = arguments[arguments.length - 1]

    let _isLoggedIn = this.isLoggedIn()

    // Logged in
    if (_isLoggedIn || !data) {
      if (cb) cb(_isLoggedIn)
      return
    }

    // Not logged in
    jQuery.ajax({
      url: `${Config.apiUrl}/user/login`,
      data: data,
      success: (resp) => {
        location.reload()
        this.setToken(resp.token)
        if (cb) cb(resp)
      },
      error: (resp)=> {
        alert('Login failed')
      }
    })
  }

  logout() {
    this.deleteToken()
    return location.reload()
  }

  getToken() {
    return localStorage.getItem(this.tokenString)
  }

  setToken(value) {
    return localStorage.setItem(this.tokenString, value)
  }

  deleteToken() {
    return localStorage.removeItem(this.tokenString)
  }

  isLoggedIn() {
    return !!this.getToken()
  }
}

export default new Auth