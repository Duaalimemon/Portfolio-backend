const Contact = require("../models/contact");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};
