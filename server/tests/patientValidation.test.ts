import { isValidPatientData, isValidPatientUpdateData, isValidPatientDelete } from '../src/api/utils/validations/patientValidation';
import { PatientModel } from '../src/api/models/PatientModel';
import { PatientData, PatientUpdateData } from '../src/api/utils/interfaces/patient/patientValidation';

jest.mock('../src/api/models/PatientModel');

describe('Patient Validation', () => {
    it('should return 400 if required fields are missing for patient data', async () => {
        const data = { firstName: 'John', lastName: 'Doe' } as Partial<PatientData>; // Missing fields
        const result = await isValidPatientData(data as PatientData);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Field 'userId' is required.");
    });

    it('should return 400 if patient already exists', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        const data: PatientData = { userId: 1, firstName: 'John', lastName: 'Doe', dob: new Date('1990-01-01'), gender: 'male', address: '123 Main St' };
        const result = await isValidPatientData(data);
        expect(result.status).toBe(400);
        expect(result.message).toBe('Patient already exists.');
    });

    it('should return 200 if all required fields are present and patient does not exist', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue(null);
        const data: PatientData = { userId: 1, firstName: 'John', lastName: 'Doe', dob: new Date('1990-01-01'), gender: 'male', address: '123 Main St' };
        const result = await isValidPatientData(data);
        expect(result.status).toBe(200);
    });

    it('should return 400 if patient does not exist for update', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue(null);
        const data: PatientUpdateData = { firstName: 'John', lastName: 'Doe', dob: new Date('1990-01-01'), gender: 'male', address: '123 Main St' };
        const result = await isValidPatientUpdateData(1, data);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Patient doesn't exist.");
    });

    it('should return 200 if patient exists for update', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        const data: PatientUpdateData = { firstName: 'John', lastName: 'Doe', dob: new Date('1990-01-01'), gender: 'male', address: '123 Main St' };
        const result = await isValidPatientUpdateData(1, data);
        expect(result.status).toBe(200);
    });

    it('should return 404 if patient does not exist for deletion', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue(null);
        const result = await isValidPatientDelete(1);
        expect(result.status).toBe(404);
        expect(result.message).toBe('Patient not found.');
    });

    it('should return 200 if patient exists for deletion', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        const result = await isValidPatientDelete(1);
        expect(result.status).toBe(200);
    });
});
