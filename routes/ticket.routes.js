const express = require('express');
const Queue = require('../models/Queue');
const Ticket = require('../models/Ticket');
const { check, validationResult } = require('express-validator');


const router = express.Router();


// @ POST api/tickets/create-ticket
// @ creates a new ticket.
router.post('/create-ticket', [
    check('ticketType', 'Ticket type is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const ticketCreator = req.user;

        if (ticketCreator.role !== 'admin') return res.status(401).json({ msg: "Unauthorized access" });

        const {
            ticketType,
            description,
            comment,
        } = req.body

        if (!ticketType) return res.status(400).json({ msg: 'Ticket type is required' });

        const queue = await Queue.findOne({ forrole: ticketType });

        if (!queue) return res.status(400).json({ msg: "Queue not found, contact an admin or create a new one" });

        const commnetObj = {
            commenter: ticketCreator._id,
            comment,
            date: Date.now()
        }

        const processingObj = {
            user: ticketCreator._id,
            date: Date.now(),
        }

        const data = {
            ticketType,
            queueasociated: queue._id,
            asignedto: null,
            createdby: ticketCreator._id,
            description,
            currentsituation: {
                status: "pending"
            },
            comments: [commnetObj],
            processinghistory: [processingObj],
            createdat: Date.now(),
        };

        const ticket = new Ticket(data);

        if (!ticket) return res.status(400).json({ msg: "Error creating the ticket" });

        await ticket.save();
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating the ticket' });
    }

});


// @ PUT api/tickets/new-comment/:id
// @ add a new comment to the ticket
router.put('/new-comment/:id', [
    check('comment', 'Comment body is required').not().isEmpty(),
], async (req, res) => {
    const ticketId = req.params.id;
    const commenter = req.user._id;

    try {
        const ticket = await Ticket.findById(ticketId);

        if(!ticket) return res.status(400).json({ msg: "ticket not found" });

        const commentObj = {
            commenter,
            comment: req.body.comment,
            date: Date.now(),
        }

        ticket.comments.unshift(commentObj);
        await ticket.save();
        res.status(200).json(ticket);

    } catch (error) {
        res.status(500).json({ msg: 'Error adding comment to the ticket' });
    }
})

// @ PUT api/tickets/change-status/:id
// @ change the status of the ticket
router.put('/change-status/:id', [
    check('status', 'Status is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const ticketId = req.params.id;

        const ticket = await Ticket.findById(ticketId);

        if(!ticket) return res.status(400).json({ msg: "ticket not found" });

        const { status } = req.body;

        ticket.currentsituation.status = status;
        ticket.currentsituation.changedon = Date.now();

        await ticket.save();

        res.status(200).json(ticket);

    } catch (error) {
        res.status(500).json({ msg: 'Error changing ticket status' });
    }
})

// @ PUT api/tickets/reasign/:id
// @ reasign the ticket to another agent

// @ GET api/tickets/comments/:id
// @ get all coments

// @ GET api/tickets/comment/:comment_id/:ticket_id
// @ get a specific comment

// @ GET api/tickets/processing-history/:id
// @ get the processing history of the ticket

// @ GET api/tickets/processing-history/:user_id/:ticket_id
// @ get the processing history of the ticket of a specific user

// @ GET api/tickets/info/:id
// @ get a ticket info

// @ DELETE api/tickets/remove/:id
// @ delete a ticket 



module.exports = router;