const express = require('express');
const Email = require('../../../backend/model/Email');
const router = express.Router();

router.post('/emailadd', async (req, res) => {
    try {
        const emailObj = {
            email: req.body.email
        };
        const email = new Email(emailObj);
        await email.save();
        res.status(201).json({ message: "Subscribe success!" });
    } catch (error) {
        console.log(error);
        if (error.code === 11000) { 
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

//Get code//

router.get("/emailget", async (req, res) => {
    try {
        const email = await Email.find({})
        res.json(email)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'System Error' });
    }
})

//////---tatal count-----///
router.get('/total-subscribe', async (req, res) => {
    try {
        const totalSubs = await Email.countDocuments();
        res.json({ totalSubs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete Code//

router.delete('/email/:id', async (req, res) => {
    try {
        const id = req.params.id
        const email = await Email.findByIdAndDelete(id)
        if (email) {

            res.json(email)
        } else {
            res.status(404).json({ message: "kaj hoi nai" })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'top code a somossa' })
    }

})
///////-----////
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const email = await Email.findByIdAndDelete(id)
        if (email) {

            res.json(email)
        } else {
            res.status(404).json({ message: "success" })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'top code a somossa' })
    }

})
module.exports = router;