import express from 'express';
import { MedicalRecordCommandController } from '../../controllers/medicalRecord/MedicalRecordCommandController';
import { MedicalRecordQueryController } from '../../controllers/medicalRecord/MedicalRecordQueryController';
import { authenticateToken } from '../../utils/middleware/auth';

const router = express.Router();

// Query endpoints
router.get('/', authenticateToken, MedicalRecordQueryController.listMedicalRecords);
router.get('/:id', authenticateToken, MedicalRecordQueryController.getMedicalRecord);
router.get('/medicalRecords/:id/atestado', MedicalRecordQueryController.generateAtestado);

// Command endpoints
router.post('/', authenticateToken, MedicalRecordCommandController.createMedicalRecord);
router.put('/:id', authenticateToken, MedicalRecordCommandController.updateMedicalRecord);
router.delete('/:id', authenticateToken, MedicalRecordCommandController.deleteMedicalRecord);

export default router;
