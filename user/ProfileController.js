var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Profile = require('./Profile');

// CREATES A NEW Profile
router.post('/', function (req, res) {
    Profile.create(req.body, 
        function (err, Profile) {
            if (err) return res.status(500).send("There was a problem adding the information to the database : "+err);
            res.status(200).send(Profile);
        });
});

// RETURNS ALL THE ProfileS IN THE DATABASE
router.get('/', function (req, res) {
    
	Profile.find({})
	.populate('user_id'). // only return the Persons name
  exec(function (err, Profiles) {
	  
	  

        if (err) return res.status(500).send("There was a problem finding the Profiles.");
        res.status(200).send(Profiles);
    });
});


router.get('/findByPagination', function (req, res) {

	var skip_param=parseInt(req.query.skip);
	var limit_param=parseInt(req.query.limit);
	console.log('skip:'+skip_param);
	console.log('limit:'+limit_param);
	var q = Profile.find().populate('user_id').skip(skip_param).limit(limit_param);

	q.exec( function (err, profiles) {
		if (err) return res.status(500).send("There was a problem finding the profiles : "+err);
		res.status(200).send(profiles);
	});
   
});



// GETS A SINGLE Profile FROM THE DATABASE
router.get('/:id', function (req, res) {
    Profile.findById(req.params.id, function (err, Profile) {
        if (err) return res.status(500).send("There was a problem finding the Profile.");
        if (!Profile) return res.status(404).send("No Profile found.");
        res.status(200).send(Profile);
    });
});


router.get('/search/byAge', function (req, res) {
	
			console.log('req.body.agefrom:'+req.query.agefrom);
			console.log('req.body.ageto:'+req.query.ageto);
			Profile.find({ "about_details.age": { $gt : req.params.agefrom, $lt : req.params.ageto}}, function (err, Profiles) {
			if (err) return res.status(500).send("There was a problem finding the profiles.");
			if (!Profiles) return res.status(404).send("No profiles found.");
			res.status(200).send(Profiles);
		});
		}

    );

router.get('/byWorkingCity/:country/:city', function (req, res) {
	

			Profile.find({ 'about_details.work_location_country': req.params.country, 'about_details.work_location_city': req.params.city}, function (err, Profiles) {
			if (err) return res.status(500).send("There was a problem finding the profiles.");
			if (!Profiles) return res.status(404).send("No profiles found.");
			res.status(200).send(Profiles);
		});
		}

    );
	
router.get('/search/byCaste', function (req, res) {
	
			console.log('req.body.caste:'+req.query.caste);
			console.log('req.body.religion:'+req.query.religion);
			Profile.find({ "religion_details.religion": req.query.religion, "religion_details.caste": req.query.caste}, function (err, Profiles) {
			if (err) return res.status(500).send("There was a problem finding the profiles.");
			if (!Profiles) return res.status(404).send("No profiles found.");
			res.status(200).send(Profiles);
		});
		}

    );	


router.get('/common/search', function (req, res) {
console.log('in search');
//generate query object based on availability of value 
var query = {};


if( req.query.reliigion != "" && req.query.reliigion != undefined ) {
    query["religion_details.reliigion"] = req.query.reliigion;
	console.log('req.body.religion:'+req.query.religion);
}

if( req.query.caste != "" && req.query.caste != undefined) {
    query["religion_details.caste"] = req.query.caste;
	console.log('req.body.caste:'+req.query.caste);			
}

if( req.query.workcity != "" && req.query.workcity != undefined) {
    query["about_details.work_location_city"] = req.query.workcity;
	console.log('req.query.workcity:'+req.query.workcity);			
}

if( req.query.workcountry != "" && req.query.workcountry != undefined) {
    query["about_details.work_location_country"] = req.query.workcountry;
	console.log('req.query.workcountry:'+req.query.workcountry);			
}

if( req.query.maritalstatus != "" && req.query.maritalstatus != undefined) {
    query["about_details.marital_status"] = req.query.maritalstatus;
	console.log('req.query.maritalstatus:'+req.query.maritalstatus);			
}


if( req.query.education != "" && req.query.education != undefined) {
    query["about_details.education_details"] = req.query.education;
	console.log('req.query.education:'+req.query.education);			
}

if( req.query.verified != "" && req.query.verified != undefined) {
    query["profile_verified"] = req.query.verified;
	console.log('req.query.verified:'+req.query.verified);			
}



    //query["profile_active"] = true;
	
console.log('All query parameters set');


	var query1 = Profile.find(query);
	
	if( req.query.agefrom !== "" && req.query.agefrom !== undefined) {
		query1.where("about_details.age").gt(req.query.agefrom);
	}
	if( req.query.ageto !== "" && req.query.ageto !== undefined) {
		query1.where("about_details.age").lt(req.query.ageto);
	}
query1.limit(5);

// sort by age
query1.sort({ "about_details.age": 1 });

			query1.populate('user_id').exec(function  (err, Profiles) {
			if (err) return res.status(500).send("There was a problem finding the profiles.");
			if (!Profiles) return res.status(404).send("No profiles found.");
			res.status(200).send(Profiles);
		});
		}

    );	

// DELETES A Profile FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Profile.findByIdAndRemove(req.params.id, function (err, Profile) {
        if (err) return res.status(500).send("There was a problem deleting the Profile.");
        res.status(200).send("Profile: "+ Profile.name +" was deleted.");
    });
});

// UPDATES A SINGLE Profile IN THE DATABASE
router.put('/:id', function (req, res) {
    Profile.findByIdAndUpdate(req.params.id, req.body,  function (err, Profile) {
        if (err) return res.status(500).send("There was a problem updating the Profile: "+err);
		console.log('profile updated.');
        res.status(200).send(Profile);
    });
});



router.get('/common/countries', function (req, res) {
	console.log('in countries');
	res.sendFile(__dirname + '/countries.json');
});

router.get('/common/cities', function (req, res) {
	console.log('in cities');
	res.sendFile(__dirname + '/cities.json');
});

router.get('/common/occupations', function (req, res) {
	console.log('in occupations');
	res.sendFile(__dirname + '/occupations.json');
});

module.exports = router;
