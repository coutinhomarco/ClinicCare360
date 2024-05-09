import express from 'express';
import { MedicalRecordCommandController } from '../../controllers/medicalRecord/MedicalRecordCommandController';
import { MedicalRecordQueryController } from '../../controllers/medicalRecord/MedicalRecordQueryController';

const router = express.Router();

// Query endpoints
router.get('/', MedicalRecordQueryController.listMedicalRecords);
router.get('/:id', MedicalRecordQueryController.getMedicalRecord);

// Command endpoints
router.post('/', MedicalRecordCommandController.createMedicalRecord);
router.put('/:id', MedicalRecordCommandController.updateMedicalRecord);
router.delete('/:id', MedicalRecordCommandController.deleteMedicalRecord);

export default router;
