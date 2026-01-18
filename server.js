const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Sabse upar rakhein taaki variables load ho jayein

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB URI Check
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ ERROR: MONGO_URI is not defined in environment variables.");
    // Build fail hone se bachane ke liye hum yahan process.exit(1) sirf production mein karenge
    if (process.env.NODE_ENV === "production") {
        process.exit(1);
    }
} else {
    // Connect to MongoDB
    // Note: Mongoose 6+ mein useNewUrlParser aur useUnifiedTopology ki zaroorat nahi hoti, 
    // lekin purane versions ke liye ye rehne dein.
    mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => {
        console.error("MongoDB Connection Failed ❌");
        console.error(err.message);
    });
}

// Routes
// Ensure karein ke "./routes/contactRoutes" file aapke project mein exist karti ho
try {
    const contactRoutes = require("./routes/contactRoutes");
    app.use("/api", contactRoutes);
} catch (error) {
    console.warn("⚠️ Routes loading warning: contactRoutes not found or has errors.");
}

// Sample route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend is working!', status: 'Online' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

