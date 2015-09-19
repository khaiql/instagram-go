import React from 'react'

class WallFeeds extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <img className="card-img-top" data-src="holder.js/100%x180/" alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Button</a>
          </div>
        </div>

        <div className="card">
          <img className="card-img-top" data-src="holder.js/100%x180/" alt="Card image cap" />
          <div className="card-block">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Button</a>
          </div>
        </div>
      </div>
    )
  }

}

export default WallFeeds