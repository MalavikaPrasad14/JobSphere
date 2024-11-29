const express=require('express')
const router=express.Router();
const jobModel=require('../model/jobData')
router.use(express.json());
router.use(express.urlencoded({extended:true}))





//get operation
router.get('/',async (req,res)=>{
    try{
    const data=await jobModel.find();
    res.status(200).send(data);
    }catch (error){
        res.status(404).send('data not found');
}
})
router.get('/:id',async (req,res)=>{
    try{
        const id=req.params.id;
    const data=await jobModel.findById(id);
    res.status(200).send(data);
    }catch (error){
        res.status(404).send('data not found');
}
})
//post operation
router.post('/addjob',async(req,res)=>{
    try {
        var item=req.body;
        const data1=new jobModel(item);
        const saveddata=await data1.save();
        res.status(200).send('post successful');
    } catch (error) {
        res.status(404).send('post unsuccessful');
    }
    
    })
    
    //put operation
    router.put('/edit/:id',async(req,res)=>{
        try {
            const id=req.params.id;
            const data=await jobModel.findByIdAndUpdate(id,req.body);
            res.status(200).send('Update successful');
        } catch (error) {
            res.status(404).send('Update unsuccessful');
        }
    
    })
    
    //delete operation
    router.delete('/remove/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await jobModel.findByIdAndDelete(id);
        res.status(200).send('Delete successful');
    } catch (error) {
        res.status(404).send('Delete unsuccessful');
    }
    
    })
    
    
    
    
    
    
    
    
    
    
    
    
module.exports=router