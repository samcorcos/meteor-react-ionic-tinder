import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Other from './Other.js';

export default OtherContainer = createContainer(({ id }) => {
	let handle = Meteor.subscribe("myData")
	let data = MyData.find({affirmative: true}, { sort: { created: 1 }}).fetch()

	return {
		loading: Meteor.isClient && !handle.ready(),
		users: data
	};
}, Other);