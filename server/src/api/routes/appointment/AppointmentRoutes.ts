import express from 'express';
import { AppointmentCommandController } from '../../controllers/appointment/AppointmentCommandController';
import { AppointmentQueryController } from '../../controllers/appointment/AppointmentQueryController';

const router = express.Router();

// Query endpoints
router.get('/', AppointmentQueryController.listAppointments);
router.get('/:id', AppointmentQueryController.getAppointment);

// Command endpoints
router.post('/', AppointmentCommandController.createAppointment);
router.put('/:id', AppointmentCommandController.updateAppointment);
router.delete('/:id', AppointmentCommandController.deleteAppointment);

export default router;
