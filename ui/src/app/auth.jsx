import Config from './config.jsx'
import jQuery from 'jquery'

class Auth {
  constructor() {
    this.tokenString = '_sssToken'
    console.log('This is auth');
  }

  login(data, cb) {
    cb = arguments[arguments.length - 1]

    // Logged in
    if (this.isLoggedIn()) {
      if (cb) cb(true)

      return
    }

    // Not logged in
    jQuery.ajax({
      url: `${Config.apiUrl}/user/login`,
      data: data,
      success: (data) => {
        console.log('success');
        this.setToken(data.token)
        if (cb) cb(data)
      },
      error: (data)=> {
        console.log('error')
        if (cb) cb(data)
      }
    })
  }

  logout() {
    return this.deleteToken()
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