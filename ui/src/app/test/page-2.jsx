import React from 'react';
import { Link } from 'react-router'

class Page2 extends React.Component {
  render() {
    return (
      <div>
        <h1>Page 2</h1>
        <p>Hahahahahahahahah page2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos odio aspernatur eligendi magnam consequatur, vero dolore ad inventore unde doloremque, nisi perferendis dolor tenetur optio voluptatem, officia temporibus voluptates quo.</p>
        <Link to="/page1">Go to page 1</Link>
      </div>
    );
  }
}

export default Page2;