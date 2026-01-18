require('dotenv').config(); // load .env first

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI:", MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Connection Failed ❌", err));

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require('cors');

// Allow all origins
app.use(cors());

const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);
