    import express from 'express';
    import { AppointmentCommandController } from '../../controllers/appointment/AppointmentCommandController';
    import { AppointmentQueryController } from '../../controllers/appointment/AppointmentQueryController';
    import { authenticateToken } from '../../utils/middleware/auth';

    const router = express.Router();

    // Query endpoints
    router.get('/',authenticateToken , AppointmentQueryController.listAppointments);
    router.get('/:id',authenticateToken , AppointmentQueryController.getAppointment);

    // Command endpoints
    router.post('/',authenticateToken , AppointmentCommandController.createAppointment);
    router.put('/:id',authenticateToken , AppointmentCommandController.updateAppointment);
    router.delete('/:id',authenticateToken , AppointmentCommandController.deleteAppointment);

    export default router;
