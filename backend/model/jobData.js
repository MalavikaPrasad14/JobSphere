const mongoose=require('mongoose')


const jobPostSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RecruiterProfile', 
    // required: true,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String, 
  
  },
  jobType: {
    type: String, 
    required: true,
  },
  location: {
    type: String, 
    required: true,
  },
  salaryRange: {
    type: String, 
  
  },
  skillsRequired: {
    type: [String], 
  },
  experienceRequired: {
    type: String,
  },
  Requirments: {
    type: String, 
  },
  companyName: {
    type: String, 
     
  },
  companyLogo: {
    type: String, 
  },

  aboutCompany: {
    type: String, 
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  applicationDeadline: {
    type: Date, 
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
});

module.exports = mongoose.model('jobdetailS', jobPostSchema);