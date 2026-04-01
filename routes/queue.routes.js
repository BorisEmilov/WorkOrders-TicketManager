const express = require('express');
const Queue = require('../models/Queue');
const Ticket = require('../models/Ticket');


const router = express.Router();

// @ POST api/queues/new-queue
// @ creates a new queue only if the current user is an admin.

router.post('/new-queue', async (req, res) => {

    if(req.user.role !== 'admin') return res.status(401).json({ msg: "Unauthorized access" });

    try {
        const forRole = req.body.forRole;

        if(!forRole) return res.status(400).json({ msg: 'Asign the queue to a role' });

        const newQueue = new Queue({
            forRole,
        });

        if(!newQueue) return res.status(400).json({ msg: 'Error createing the queue' });

        await newQueue.save();
        res.status(200).json(newQueue);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating the queue' });
    }
});




module.exports = router;