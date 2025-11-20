const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const UserRoutes = require('./Routes/Userroutes.js');
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/user', UserRoutes);

// Error handler middleware (must be last)
const errorHandler = require('./MiddleWares/ErorrHandler.js');
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});