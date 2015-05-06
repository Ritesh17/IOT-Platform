var mongoose = require('mongoose');

var db = mongoose.connection;

var movieSchema = new mongoose.Schema({
  title: { type: String }
, rating: String
, releaseYear: Number
, hasCreditCookie: Boolean
});


mongoose.connect('mongodb://localhost:27017/test');

var Movie = mongoose.model('yo', movieSchema);

var thor = new Movie({
  title: 'CBSThor'
, rating: 'PG-13'
, releaseYear: '20111223'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
, hasCreditCookie: true
});

thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});

// });

