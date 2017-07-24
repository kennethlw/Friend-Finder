// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey request... this data is then sent to the server...
  // Then the server saves the data to the friendsData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

  	  var bestMatch = {
  	  	name: "",
  	  	image: "",
  	  	matchDifference: 1000
  	  }

  	  var userData = req.body;
  	  var userName = userData.name;
  	  var userImage = userData.image;
  	  var userScores = userData.scores;

  	  var totalDifference = 0;

  	  //loop through all the friends objects
  	  for(var i = 0; i < friendsData.length; i++) {
		
		//console.log(friendsData[i].name);
		totalDifference = 0;
		//loop through all question scores
		for (var j = 0; j < 10; j++) {

			totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
			//console.log(totalDifference);
		}
		if (totalDifference <= bestMatch.matchDifference) {

			bestMatch.name = friendsData[i].name;
			bestMatch.photo = friendsData[i].photo;
			bestMatch.matchDifference = totalDifference;
		}
	 

	   }


      friendsData.push(userData);

      res.json(bestMatch);


  });
}