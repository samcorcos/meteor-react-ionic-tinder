import React from 'react';
import { Link } from 'react-router';

export default class AppBody extends React.Component {
  render() {
    return (
      <div className="ionic-body">
        <div className="bar bar-header bar-light">
          <Link className="button button-icon icon ion-gear-a" to={"/settings"}></Link>
          <Link className="h1 title" to={"/"}>App Name</Link>
          <Link className="button button-icon icon ion-heart" to={"/other"}></Link>
        </div>

        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className="content overflow-scroll has-header">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}