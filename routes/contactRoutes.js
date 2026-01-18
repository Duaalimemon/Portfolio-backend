const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // path check

router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Your message sent successfully" });
    } catch (err) {
        console.error(err); // 🔑 check terminal for error
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

