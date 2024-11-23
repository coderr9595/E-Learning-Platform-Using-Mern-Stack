const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes=require('./routes/courseRoutes');
const purchasedCourseRoutes=require('./routes/purchasedCourseRoutes');
const { generateAnswer } =require('./controllers/answerController')
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));
app.options('*', cors()); 

  
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/purchased-courses', purchasedCourseRoutes);
app.post("/generate-answer", generateAnswer);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));