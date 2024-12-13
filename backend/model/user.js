const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,

    },
    email: {
        type: String,
        
        unique: true
    },
    phoneNumber: {
        type: Number,
    
    },
    password:{
        type:String,
        
    },
    role:{
        type:String,
        enum:['student','recruiter'],

    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true});
module.exports = mongoose.model('log', userSchema);