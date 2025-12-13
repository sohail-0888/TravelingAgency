const express = require('express');
const cors = require('cors');


const { connectDB } = require('./config/db');
require('dotenv').config();



const app = express();
app.use(express.json());
//routers

const userRoutes = require('./routers/authRouter');
const tripRouter = require('./routers/tripRouter');
const bookingRoutes = require("./routers/bookingRoute");
const paymentRouter = require('./routers/paymentRoutes');
const reveiwRouter = require('./routers/ReveiwRouters')
const userRouter = require('./routers/URouters')

app.use('/api/auth', userRoutes);
app.use('/api/trips', tripRouter);
app.use("/api/b", bookingRoutes);
app.use('/api/pay',paymentRouter);
app.use('/api/r',reveiwRouter);
app.use('/api/user',userRouter)



// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Connect to DB first, then start server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
