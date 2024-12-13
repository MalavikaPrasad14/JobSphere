const cookieParser=require('cookie-parser');
const express=require ('express');
const cors=require('cors');

const app=new express();
app.use(cors());
const morgan=require ('morgan');
app.use(morgan('dev'));
const jobDetailsRoutes=require ('./routes/jobDetailsRoutes');
app.use('/jobs',jobDetailsRoutes);
const userRoutes=require ('./routes/userRoutes');
app.use("/api", userRoutes);

require('dotenv').config();

require('./db/connection')
// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT=process.env.PORT;









app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})