const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/users');
const swapRoutes = require('./routes/swaps');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/swaps', swapRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(5000, () => console.log('Server running on port 5000')))
.catch((err) => console.error(err));