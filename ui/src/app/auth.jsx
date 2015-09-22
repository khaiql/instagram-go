import Config from './config.jsx'
import jQuery from 'jquery'

class Auth {
  constructor() {
    this.tokenStr = Config.ls.acc.token
    this.displayNameStr = Config.ls.acc.displayName
    this.idStr = Config.ls.acc.id
    this.login()
  }

  login(data, cb, cb_e) {
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
        this.setId(resp.Id)
        this.setDisplayName(resp.DisplayName)
        alert('Login successfully')
        location.reload()
      },
      error: ()=> {
        cb_e()
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

  getId() {
    return localStorage.getItem(this.idStr)
  }

  setId(value) {
    return localStorage.setItem(this.idStr, value)
  }

  deleteId() {
    return localStorage.removeItem(this.idStr)
  }

  isLoggedIn() {
    return !!this.getToken()
  }
}

export default new Auth