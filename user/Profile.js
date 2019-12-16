var mongoose = require('mongoose');  

var ProfileSchema = new mongoose.Schema({  

	about_details: {

		about_myself: { type: String, required: true, default:"" },
		birthdate: { type: Date, default: Date.now, required: true},
		gender: { type: String, required: true, enum:['Male','Female'] },
		age: { type: Number, required: true},
		marital_status: { type: String, required: true, enum: ['Never Married', 'Divorced','Awaiting Divorce','Annulled','Widow'] },
		mother_toungue: { type: String, required: true, enum: ['Marathi', 'Hindi','English'] },
		spoken_languages: [{ type: String, default:""}],
		children: { type: String, enum: ['No', '1','2','3','4'] },
		photos: [{ type: String}],
		looking_for_details: { type: String, required: true, default:"" },
		interests: [{ type: String, default:""}],
		education_details: { type: String, default:"" },
		undergraduate_degree: { type: String, default:"" },
		graduate_degree: { type: String, default:"" },
		undergraduate_institute_details: { type: String, default:"" },
		graduate_institute_details: { type: String, default:"" },
		occupation_details: { type: String, default:"" },
		employment: { type: String, default:"",enum: ['Not Employed','Public Sector', 'Private Sector','Government Job'] },
		
		gotra: { type: String, default:"",enum: ['Don\'t Know','Bachchas','Bansal','Bhargava','Dahiya','Dubey','Gautam','Gohel','Goyal','Jadaun','Kansal','Kaundinya gotra','Kaushal','Kaushik','Mittal','Mahiwal','Munshi','Nanda','Panchal','Parashar','Rathod','Rawal','Sandilya','Saraswat','Shandilya','Sheoran','Singhal','Srivatsa','Upreti','Vaid','Vasishtha','Vishvakarman'] },
		
		work_location_city: { type: String, default:"" },
		work_location_country: { type: String, default:"" },
		salary_details: { type: String, default:"" },
		food_habits: { type: String, default:"",enum: ['Vegetarian','Eggetarian','Non Vegetarian'] },
		drinking_habits: { type: String, default:"",enum: ['No','Yes','Occasionally'] },
		smoking_habits: { type: String, default:"",enum: ['No','Yes','Occasionally'] },
		health_issues: { type: String, default:""},
		food_liking: [{ type: String, default:""}]
	},

	family_details: {

		about_family: { type: String, required: true, default:"" },
		father: { type: String, enum:['Working','Not Working', 'Retired','Expired']},
		mother: { type: String, enum:['Housewife','Working','Not Working', 'Retired','Expired']},
		father_occupation: { type: String, default:""},
		mother_occupation: { type: String, default:""},		
		no_of_brothers: { type: Number, enum:[0,1,2,3,4,5,6]},
		no_of_sisters: { type: Number, enum:[0,1,2,3,4,5,6]},
		family_location_city: { type: String, default:"" },
		living_with_parents: { type: Boolean}
	},

	religion_details: {
		religion: { type: String, default:"", enum:['Hindu','Muslim','Christian','Sikh','Buddhist']},
		caste: { type: String, default:"" },
		sub_caste: { type: String, default:"" }
		
	},

	address_details: {
		address1: { type: String, default:"" },
		address2: { type: String, default:"" },
		city: { type: String, default:"" },
		state: { type: String, default:"" },
		zip: { type: String, default:"" },
		country: { type: String, default:"" }
	},


	contact_details: {
		primary_email: { type: String, default:"" },
		secondary_email: { type: String, default:"" },
		phone_no_area_code: { type: String, default:"" },
		phone_no: { type: String, default:"" }
	},

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	managed_by: { type: String, enum: ['Myself', 'Parents','Brother','Sister','Friend','Other'] },
	creationdate: { type: Date, default: Date.now, required: true},
	modificationdate: { type: Date, default: Date.now, required: true},
	profile_verified: { type: Boolean, default:false},
	profile_status: { type: String, default:"Active", enum:['Active','Hidden','Deleted']},

});


mongoose.model('Profile', ProfileSchema);

module.exports = mongoose.model('Profile');