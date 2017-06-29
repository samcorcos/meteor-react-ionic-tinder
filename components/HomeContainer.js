import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Home from './Home.js';

export default HomeContainer = createContainer(({ id }) => {
	let handle = Meteor.subscribe("myData")
	let data = MyData.find({}, { sort: { created: 1 }}).fetch()

	return {
		loading: Meteor.isClient && !handle.ready(),
		users: data
	};
}, Home);