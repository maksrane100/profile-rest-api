var mongoose = require('mongoose');  
const mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({  
	firstname: { type: String, required: true, trim: true },
	lastname: { type: String, required: true, trim: true }, 
	password: { type: String, required: true, trim: true },
	email: { type: String, required: true, trim: true }, 
	birthdate: { type: Date, default: Date.now, required: true},
	creationdate: { type: Date, default: Date.now, required: true},
	modificationdate: { type: Date, default: Date.now, required: true},
	deactivationdate: { type: Date, default: Date.now, required: true},
	age: { type: Number, required: true},
	source: { type: String, trim: true }, 
	security_question: { type: String, default:'City where you did your first job?', required: true, trim: true },
	security_answer: { type: String, required: true, trim: true }, 
	
	membership_details: {
	
		membershipFromDate: { type: Date, default: Date.now},	
		membershipToDate: { type: Date, default: Date.now},	
		price: { type: Number, default:0},
		membershipType: { type: String, default: '' }
	},
	active: { type: Boolean, default:true}
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);


//mongoose.model('User', UserSchema);

//module.exports = mongoose.model('User');