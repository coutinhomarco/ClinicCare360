import { isValidAppointmentData, isValidAppointmentUpdateData, isValidAppointmentDelete } from '../src/api/utils/validations/appointmentValidation';
import { AppointmentModel } from '../src/api/models/AppointmentModel';

jest.mock('../src/api/models/AppointmentModel');

describe('Appointment Validation', () => {
    it('should return 400 if required fields are missing for appointment data', async () => {
        const data = { doctorId: 1, appointmentDate: new Date('2024-05-01') }; // Missing fields
        const result = await isValidAppointmentData(data);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Field 'patientId' is required.");
    });

    it('should return 200 if all required fields are present for appointment data', async () => {
        const data = { patientId: 1, doctorId: 1, appointmentDate: new Date('2024-05-01T11:00'), startTime: new Date('2024-05-01T10:00'), endTime: new Date('2024-05-01T11:00'), status: 'confirmed' };
        const result = await isValidAppointmentData(data);
        expect(result.status).toBe(200);
    });

    it('should return 404 if appointment does not exist for deletion', async () => {
        (AppointmentModel.findOne as jest.Mock).mockResolvedValue(null);
        const result = await isValidAppointmentDelete(1);
        expect(result.status).toBe(404);
        expect(result.message).toBe('Appointment not found.');
    });

    it('should return 200 if appointment exists for deletion', async () => {
        (AppointmentModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        const result = await isValidAppointmentDelete(1);
        expect(result.status).toBe(200);
    });
});
