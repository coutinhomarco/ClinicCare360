import express from 'express';
import userRoutes from './api/routes/user/userRoutes';
import doctorRoutes from './api/routes/doctor/DoctorRoutes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
