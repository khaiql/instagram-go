import Config from './config.jsx'
import jQuery from 'jquery'

class Auth {
  constructor() {
    this.tokenStr = Config.ls.acc.token
    this.displayNameStr = Config.ls.acc.displayName
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
        this.setToken(resp.Token)
        this.setDisplayName(resp.DisplayName)
        // if (cb) cb(resp)
        location.reload()
      },
      error: (resp)=> {
        alert('Login failed')
      }
    })
  }

  logout() {
    this.deleteToken()
    this.deleteDisplayName()
    return location.reload()
  }

  getToken() {
    return localStorage.getItem(this.tokenStr)
  }

  setToken(value) {
    return localStorage.setItem(this.tokenStr, value)
  }

  deleteToken() {
    return localStorage.removeItem(this.tokenStr)
  }

  getDisplayName() {
    return localStorage.getItem(this.displayNameStr)
  }

  setDisplayName(value) {
    return localStorage.setItem(this.displayNameStr, value)
  }

  deleteDisplayName() {
    return localStorage.removeItem(this.displayNameStr)
  }

  isLoggedIn() {
    return !!this.getToken()
  }
}

export default new Auth