const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,

    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
  address: {
    type: String,
    
  },
  about: {
    type: String,
    
  },
  companyType: {
    type: [String], // Array of strings for multiple company types
    
  },
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  website: {
    type: String,
    // URL validation
  },
 
  banner: {
    type: String, // Path or URL to the banner image
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });
module.exports = mongoose.model('log', userSchema);