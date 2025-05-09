const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
const connectdb = require('./db/db')
const authRoute = require('./routes/authroutes')
const activityRoute = require('./routes/activityroutes')

connectdb()
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute)
app.use('/api/activity', activityRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})