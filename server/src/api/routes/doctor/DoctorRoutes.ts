import express from 'express';
import { DoctorCommandController } from '../../controllers/doctor/DoctorCommandController';
import { DoctorQueryController } from '../../controllers/doctor/DoctorQueryController';
import { authenticateToken } from '../../utils/middleware/auth';

const router = express.Router();

// Query endpoints
router.get('/',authenticateToken ,DoctorQueryController.listDoctors);
router.get('/:id',authenticateToken , DoctorQueryController.getDoctor);

// Command endpoints
router.post('/', DoctorCommandController.createDoctor);
router.put('/:id',authenticateToken , DoctorCommandController.updateDoctor);
router.delete('/:id',authenticateToken , DoctorCommandController.deleteDoctor);

export default router;
