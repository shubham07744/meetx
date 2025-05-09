    const Activity = require('../models/activitymodel')
    const Booking = require('../models/bookingmodel')

    const getActivities = async(req, res)=>{
        try {
            const activities = await Activity.find({});
            if(activities === 0){
                return res.status(404).json({success:false, message: "No activities found"});
            }
            return res.status(200).json({success:true, activities});
        } catch (error) {
            return res.status(500).json({success:false, error: "server error while fetching activities"});
        }
    }

    const createActivity = async (req, res) => {
        const { title, description, location, date, time } = req.body;
        try {
            const activity = new Activity({ title, description, location, date, time });
            await activity.save();
            return res.status(201).json({ success: true, message: "Activity created", activity });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Server error while creating activity" });
        }
    };

    const bookActivity = async (req, res) => {
        const { activityId } = req.body;
        const userId = req.user?._id;
        try {
            const activity = await Activity.findById(activityId);
            if (!activity) {
                return res.status(404).json({ success: false, message: "Activity not found" });
            }
    
            const booking = await Booking.findOne({ user: userId, activity: activityId });
            if (booking) {
                return res.status(400).json({ success: false, message: "Activity already booked" });
            }
    
            const newBooking = new Booking({ user: userId, activity: activityId });
            await newBooking.save();
    
            return res.status(200).json({ success: true, message: "Activity booked successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, error: "Server error while booking activity" });
        }
    };

    const getBookings = async(req , res)=>{
        const userId = req.user._id;
        try {
            const bookings = await Booking.find({user: userId}).populate('activity');
            if(bookings.length === 0){
                return res.status(404).json({success:false, message: "No bookings found"});
            }
            return res.status(200).json({success:true, bookings});
        } catch (error) {
            return res.status(500).json({success:false, error:"server error while fetching bookings"});
        }
    }

    module.exports = { getActivities, bookActivity, getBookings, createActivity };