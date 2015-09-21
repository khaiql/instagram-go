import React from 'react'
import Auth from './auth.jsx'
import Login from './login.jsx'
import WallFeeds from './wallfeeds.jsx'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: Auth.isLoggedIn()
    }
  }

  render() {
    // console.log(Auth);

    return (
      <div>
      {
        this.state.isLoggedIn ? <WallFeeds /> : <Login />
      }
      </div>
    )
  }

}

export default Index