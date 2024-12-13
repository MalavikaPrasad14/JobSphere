const express=require('express')

const router = express.Router();
const User= require('../model/user');
router.use(express.json());
router.use(express.urlencoded({extended:true}))

const { login, logout, register, updateProfile, recuRegister }=require('../controller/user.controller.js')
const isAuthenticated =require('../middleware/isAuthenticator.js')
const { singleUpload }= require('../middleware/multer.js')
 


router.route("/register").post(register);
router.route("/registerRecu").post(recuRegister);
// app.post("/api/v1/user/register", upload.single("profilePhoto"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.get('/',async (req,res)=>{
    try{
    const data=await User.find();
    res.status(200).send(data);
    }catch (error){
        res.status(404).send('data not found');
}
})

module.exports=router
