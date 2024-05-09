import express from 'express';
import { DoctorCommandController } from '../../controllers/doctor/DoctorCommandController';
import { DoctorQueryController } from '../../controllers/doctor/DoctorQueryController';

const router = express.Router();

// Query endpoints
router.get('/', DoctorQueryController.listDoctors);
router.get('/:id', DoctorQueryController.getDoctor);

// Command endpoints
router.post('/', DoctorCommandController.createDoctor);
router.put('/:id', DoctorCommandController.updateDoctor);
router.delete('/:id', DoctorCommandController.deleteDoctor);

export default router;
