import express from 'express';
import userRoutes from './api/routes/user/UserRoutes';
import doctorRoutes from './api/routes/doctor/DoctorRoutes';
import patientRoutes from './api/routes/patient/PatientRoutes';
import appointmentRoutes from './api/routes/appointment/AppointmentRoutes';
import medicalRecordsRoutes from './api/routes/medicalRecord/MedicalRecordRoutes';
import jobRoutes from './api/routes/job/jobRoutes';
import './config/bullmq';

import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,   // 15 minutes
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

const app = express();

app.use(limiter)

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-records', medicalRecordsRoutes);
app.use('/api/jobs', jobRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
