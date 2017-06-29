import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      dragging: "none"
    };
  }
  moveCardInit(e) {
    e.preventDefault();
    this.setState({
      initialX: e.touches[0].pageX,
      initialY: e.touches[0].pageY,
      dragging: "none"
    })
    // console.log('start move');
  }
  moveCard(e) {
    e.preventDefault()
    deltaX = (e.touches[0].pageX - this.state.initialX)
    // deltaY = (e.touches[0].pageY - this.state.initialY)
    //Ignore y motion so scrolling isn't messed with.
    deltaY = (e.touches[0].pageY - this.state.initialY)
    //Allow large changes to affect scroll
    deltaY = (deltaY < 100 ? 0 : deltaY / 4)
    this.setState({
      x: deltaX,
      y: deltaY
    })
  }
  moveCardEnd(e) {
    e.preventDefault()
    width = window.width
    var change = e.changedTouches[0].pageX - this.state.initialX;

    if (change < -(width / 3)) {
      this.setState({
        x: -1000,
        y: 0,
        dragging: "all 1s ease"
      })
      Meteor.setTimeout(this.props.remove, 500)
    } else if (change > (width / 3)) {
      this.setState({
        x: 1000,
        y: 0,
        dragging: "all 1s ease"
      })
      Meteor.setTimeout(this.props.setAffirmative, 500)
    } else {
      this.setState({
        x: 0,
        y: 0,
        dragging: "all 1s ease"
      })
    }
  }
  render() {
    // console.log('rerendering', this.props.card.name);
    let cardStyle = {
      transform: "translate(" +
        this.state.x + "px," +
        this.state.y + "px)" +
        " rotate("+this.state.x/10 + "deg)",
      transition: this.state.dragging,
      WebkitTransform: "translate(" +
        this.state.x + "px," +
        this.state.y + "px)" +
        " rotate("+this.state.x/10 + "deg)",
      WebkitTransition: this.state.dragging
    }
    if (this.state.x <= -1000 || this.state.x >= 1000) {
      cardStyle.marginBottom = "-" + (document.getElementsByClassName("card")[0].offsetHeight + 20) + "px"
    }
    return (
      <div className="card" onTouchStart={this.moveCardInit.bind(this)} onTouchMove={this.moveCard.bind(this)} onTouchEnd={this.moveCardEnd.bind(this)} style={cardStyle}>
        <div className="item item-body">
          <img className="full-image" src={this.props.card.image} />
        </div>
        <div className="item">
          <h2>{this.props.card.name}</h2>
          <p>{this.props.card.details}</p>
        </div>
      </div>
    )
  }
}