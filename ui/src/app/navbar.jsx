import React from 'react'

class Navbar extends React.Component {
  render() {
    return(
      <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#">[SSS Photos]</a>

        <ul className="nav navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Features</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Pricing</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>

        <form style={{ margin: 0 + 'px' }} className="form-inline navbar-form pull-right" _lpchecked="1">
          <input className="form-control" type="text" placeholder="Search" />
          <button className="btn btn-secondary-outline" type="submit">Search</button>
        </form>
      </nav>
      </div>
    )
  }
}

export default Navbar