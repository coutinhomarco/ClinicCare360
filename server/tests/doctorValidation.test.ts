import { isValidDoctorData, isValidDoctorUpdateData, isValidDoctorDelete } from '../src/api/utils/validations/doctorValidation';
import { DoctorModel } from '../src/api/models/DoctorModel';
import { DoctorData } from '../src/api/utils/interfaces/doctor/doctorValidation';

jest.mock('../src/api/models/DoctorModel');

describe('Doctor Validation', () => {
    it('should return 400 if required fields are missing for doctor data', async () => {
        const data = { specialization: 'Cardiology', availability: 'Monday' } as Partial<DoctorData>; // Missing fields
        const result = await isValidDoctorData(data as DoctorData);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Field 'userId' is required.");
    });

    it('should return 400 if doctor already exists', async () => {
        (DoctorModel.getDoctorById as jest.Mock).mockResolvedValue({ id: 1 });
        const data = { userId: 1, specialization: 'Cardiology', availability: 'Monday', firstName: 'John', lastName: 'Doe' };
        const result = await isValidDoctorData(data);
        expect(result.status).toBe(400);
        expect(result.message).toBe('The user already is a doctor');
    });

    it('should return 200 if all required fields are present and doctor does not exist', async () => {
        (DoctorModel.getDoctorById as jest.Mock).mockResolvedValue(null);
        const data = { userId: 1, specialization: 'Cardiology', availability: 'Monday', firstName: 'John', lastName: 'Doe' };
        const result = await isValidDoctorData(data);
        expect(result.status).toBe(200);
    });

    it('should return 404 if doctor does not exist for deletion', async () => {
        (DoctorModel.getDoctorById as jest.Mock).mockResolvedValue(null);
        const result = await isValidDoctorDelete(1);
        expect(result.status).toBe(404);
        expect(result.message).toBe('Doctor not found.');
    });

    it('should return 200 if doctor exists for deletion', async () => {
        (DoctorModel.getDoctorById as jest.Mock).mockResolvedValue({ id: 1 });
        const result = await isValidDoctorDelete(1);
        expect(result.status).toBe(200);
    });
});
