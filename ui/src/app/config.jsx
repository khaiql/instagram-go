let _prefix = 'sss_'

const Config = {
  apiUrl: 'http://sssphotos.net:3000',
  // Local Storage
  ls: {
    // Account
    acc: {
      id: "${_prefix}id",
      displayName: "${_prefix}displayName",
      token: "${_prefix}token"
    }
  }
}

export default Config