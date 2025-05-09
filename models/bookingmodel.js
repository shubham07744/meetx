const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
    activity : { type : mongoose.Schema.Types.ObjectId, ref : 'Activity' },
    date : { type : Date, default: Date.now }
})

const booking= mongoose.model('Booking', bookingSchema);
module.exports = booking;