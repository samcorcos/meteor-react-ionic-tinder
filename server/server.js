Meteor.publish("myData", function() {
  return MyData.find({}/*, { sort: { created: 1 }}*/)
})

populate = function() {
  while (MyData.find().count() < 10) {
    MyData.insert({
      name: faker.name.findName(),
      image: faker.image.people() + "?" + Random.hexString(24),
      details: faker.lorem.sentence(),
      created: (new Date()).getTime()
    })
  }
}

Meteor.startup(function() {
  populate()
})

Meteor.methods({
  repopulate: function() {
    MyData.insert({
      name: faker.name.findName(),
      image: faker.image.people() + "?" + Random.hexString(24),
      details: faker.lorem.sentence(),
      created: (new Date()).getTime()
    })
  },
  reset: function() {
    MyData.remove({affirmative: true});
  }
})
