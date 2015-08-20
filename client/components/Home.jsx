React.initializeTouchEvents(true)

Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let handle = Meteor.subscribe("myData")
    return {
      users: handle.ready() ? MyData.find().fetch() : []
    }
  },
  getInitialState() {
    cards: this.data.users
  },
  removeCard(_id) {
    this.setState({
      cards: this.state.cards.filter((card) =>  card._id != _id )
    })
  },
  renderCards() {
    return this.state.cards.map((card) => {
      return <Card
        key={card._id}
        card={card}
        remove={ () => this.removeCard(card._id)}
      />
    })
  },
  render() {
    return <div>{this.renderCards()}</div>
  }
})


// Home = React.createClass({
//   getInitialState() {
//     return {
//       cards: [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}]
//     }
//   },
  // removeCard(id) {
  //   this.setState({cards: this.state.cards.filter((card) =>  card.id != id )})
  // },
  // renderCards() {
  //   return this.state.cards.map((card) => {
  //     return <Card key= {card.id} card={card} remove={()=>this.removeCard(card.id)}/>
  //   })
  // },
//   render() {
//     return (
//       <div>
//         {this.renderCards()}
//       </div>
//     )
//   }
// });

Card = React.createClass({
  getInitialState() {
    return {
      x: 0,
      y: 0,
      initialX: 0,
      initialY: 0,
      dragging: "none"
    }
  },
  moveCardInit(e) {
    this.setState({
      initialX: e.touches[0].pageX,
      initialY: e.touches[0].pageY,
      dragging: "none"
    })
  },
  moveCard(e) {
    deltaX = (e.touches[0].pageX - this.state.initialX)
    deltaY = (e.touches[0].pageY - this.state.initialY)
    this.setState({
      x: deltaX,
      y: deltaY
    })
  },
  moveCardEnd(e) {
    this.setState({
      x: 0,
      y: 0,
      dragging: "all 0.5s ease"
    })
  },
  render() {
    let cardStyle = {
      transform: "translate(" +
        this.state.x + "px," +
        this.state.y + "px)",
      transition: this.state.dragging
    }
    return (
      <div className="card" onTouchStart={this.moveCardInit} onTouchMove={this.moveCard} onTouchEnd={this.moveCardEnd} style={cardStyle}>
        <div className="item item-text-wrap">
          This is a basic Card which contains an item that has wrapping text.
        </div>
      </div>
    )
  }
});
