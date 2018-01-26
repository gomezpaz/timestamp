
// init project
var express = require('express');
var dateFormat = require('dateformat');
var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:date', function (req, res) {
  var date = req.params.date
  // Check if date is in unix or natural format
  if(isNaN(new Date(date*1000)) == false) {
    var response = new Date(date*1000)
  } else if(isNaN(new Date(date)) == false) {
    var response = new Date(date)
  } else {
    res.send({
      unix: null,
      natural: null
    })
  }
  var json = {
    unix: response.getTime()/1000,
    natural: dateFormat(response, "mmmm d, yyyy")
  }
  res.send(json)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
