import React from 'react';
import { Link } from 'react-router'

class Page1 extends React.Component {
  render() {
    return (
      <div>
        <h1>Page 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi fugit, at maxime, autem architecto voluptatum laboriosam totam quos, consequatur nihil tempore animi qui porro nemo ipsum atque sit laborum sint.</p>
        <Link to="/page2">Go to page 2</Link>
      </div>
    );
  }
}

export default Page1;