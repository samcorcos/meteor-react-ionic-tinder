import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

if(Meteor.isClient) {
  // React.initializeTouchEvents(true)
  // Add listener to get :active pseudoselector working. hack
  document.addEventListener("touchstart", function(){}, false)
}

export default class Home extends React.Component {
  removeCard(_id) {
    MyData.remove(_id)
    Meteor.call("repopulate")
  }
  setAffirmative(_id) {
    MyData.update({_id}, {$set: { affirmative: true}})
    Meteor.call("repopulate")
  }
  renderCards() {
    // console.log(this);
    return this.props.users && this.props.users
      .filter((user) =>  user.affirmative != true)
      .map((card) => {
        return <Card
          key={card._id}
          card={card}
          remove={ () => this.removeCard(card._id)}
          setAffirmative={ () => this.setAffirmative(card._id)}
        />
    })
  }
  render() {
    if (this.props.loading) {
      return <h1>Loading</h1>
    }
    return <div>{this.renderCards()}</div>
  }
}

Home.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.array
}