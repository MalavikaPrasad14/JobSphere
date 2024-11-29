const express=require ('express');
const cors=require('cors');

const app=new express();
app.use(cors());
const morgan=require ('morgan');
app.use(morgan('dev'));
const jobDetailsRoutes=require ('./routes/jobDetailsRoutes');
app.use('/jobs',jobDetailsRoutes);
require('dotenv').config();
const PORT=process.env.PORT;
require('./db/connection')







app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})