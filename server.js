const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Load dotenv only for local
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// MongoDB URI
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Set it in Railway Variables.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Connection Failed ❌", err));

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);

// Sample route
app.get('/', (req, res) => res.send('Backend is working!'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
