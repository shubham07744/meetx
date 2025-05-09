const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    title :  { type: String, required: true,trim: true },
    description: { type:String, required:true, trim: true},
    location: { type: String, required: true,trim: true},
    date: { type: Date, required: true},
    time: { type: String ,required: true},
    
})

const activity = mongoose.model('Activity', activitySchema);
module.exports = activity;