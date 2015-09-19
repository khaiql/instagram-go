import React from 'react'
import Router from 'react-router'
import Navbar from './navbar.jsx'
import Register from './register.jsx'
import Index from './index.jsx'
import Login from './login.jsx'
import Account from './account.jsx'

var { Route, RouteHandler, DefaultRoute, Link } = Router;
 
class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        
        <main>
          <RouteHandler />
        </main>

        <footer>
          Footer
        </footer>
      </div>
    );
  }
}

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute handler={Index} />
    <Route path="/login" handler={Login} />
    <Route path="/register" handler={Register} />
    <Route path="/account" handler={Account} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});