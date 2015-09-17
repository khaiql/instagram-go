import React from 'react'
import Auth from './auth.jsx'
import Login from './login.jsx'
import WallFeeds from './wallfeeds.jsx'

class Index extends React.Component {

  render() {
    // console.log(Auth);

    return (
      <div>
        <Login />
        <WallFeeds />
      </div>
    )
  }

}

export default Index