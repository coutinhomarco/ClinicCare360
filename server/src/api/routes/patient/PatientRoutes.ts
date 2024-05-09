import express from 'express';
import { PatientCommandController } from '../../controllers/patient/PatientCommandController';
import { PatientQueryController } from '../../controllers/patient/PatientQueryController';

const router = express.Router();

// Query endpoints
router.get('/', PatientQueryController.listPatients);
router.get('/:id', PatientQueryController.getPatient);

// Command endpoints
router.post('/', PatientCommandController.createPatient);
router.put('/:id', PatientCommandController.updatePatient);
router.delete('/:id', PatientCommandController.deletePatient);

export default router;
