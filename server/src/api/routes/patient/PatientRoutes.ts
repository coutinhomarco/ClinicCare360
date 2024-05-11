import express from 'express';
import { PatientCommandController } from '../../controllers/patient/PatientCommandController';
import { PatientQueryController } from '../../controllers/patient/PatientQueryController';
import { authenticateToken } from '../../utils/middleware/auth';

const router = express.Router();

// Query endpoints
router.get('/',authenticateToken , PatientQueryController.listPatients);
router.get('/:id',authenticateToken , PatientQueryController.getPatient);

// Command endpoints
router.post('/', PatientCommandController.createPatient);
router.put('/:id',authenticateToken , PatientCommandController.updatePatient);
router.delete('/:id',authenticateToken , PatientCommandController.deletePatient);

export default router;
