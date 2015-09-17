import React from 'react';
import Router from 'react-router';
import HelloWorld from './hello-world.jsx';
import Page1 from './page-1.jsx';
import Page2 from './page-2.jsx';

var { Route, RouteHandler, Link } = Router;
 
class HomePage extends React.Component {
  render() {
    return (
      <div>
        <p>
          <h1>Welcome to Homepage</h1>
          <Link to="/page1">Page 1</Link>
          <Link to="/page2">Page 2</Link>
        </p>
        <RouteHandler/>
      </div>
    );
  }
}

var routes = (
  <Route path="/" handler={HomePage}>
    <Route path="/page1" handler={Page1} />
    <Route path="/page2" handler={Page2} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});