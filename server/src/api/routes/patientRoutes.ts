import express from 'express';
import { PatientController } from '../controllers/patientController';

const router = express.Router();

router.get('/patients', PatientController.listPatients);
router.get('/patients/:id', PatientController.getPatient);
router.post('/patients', PatientController.createPatient);
router.put('/patients/:id', PatientController.updatePatient);
router.delete('/patients/:id', PatientController.deletePatient);

export default router;
