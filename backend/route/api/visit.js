const express = require('express')
const Visit = require('../../model/Visit')
const router = express.Router();

router.get('/track-visit', async (req, res) => {
    try {
        const ip = req.ip;
        const userAgent = req.headers['user-agent']; 

       
        const newVisit = new Visit({ ip, userAgent });
        await newVisit.save();

        res.json({ message: 'ভিজিট ট্র্যাক করা হয়েছে!' });
    } catch (error) {
        console.error('ত্রুটি:', error);
        res.status(500).json({ error: 'সার্ভার ত্রুটি' });
    }
});


router.get('/daily-visits', async (req, res) => {
    try {
        //
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0); 

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999); 
        const dailyVisits = await Visit.countDocuments({
            createdAt: { $gte: todayStart, $lt: todayEnd }
        });

        res.json({ dailyVisits });
    } catch (error) {
        console.error('ত্রুটি:', error);
        res.status(500).json({ error: 'সার্ভার ত্রুটি' });
    }
});


module.exports = router;