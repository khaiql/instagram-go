import React from 'react';
import Router from 'react-router';
import Navbar from './navbar.jsx';
import Login from './login.jsx';
import Register from './register.jsx';

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
    <DefaultRoute handler={Login} />
    <Route path="/login" handler={Login} />
    <Route path="/register" handler={Register} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});