import { isValidMedicalRecordData, isValidMedicalRecordUpdateData, isValidMedicalRecordDelete } from '../src/api/utils/validations/medicalRecordValidation';
import { PatientModel } from '../src/api/models/PatientModel';
import { DoctorModel } from '../src/api/models/DoctorModel';
import { MedicalRecordModel } from '../src/api/models/MedicalRecordModel';
import { MedicalRecordData } from '../src/api/utils/interfaces/medicalRecord/medicalRecordValidation';

jest.mock('../src/api/models/PatientModel');
jest.mock('../src/api/models/DoctorModel');
jest.mock('../src/api/models/MedicalRecordModel');

describe('Medical Record Validation', () => {
    it('should return 400 if required fields are missing for medical record data', async () => {
        const data = { patientId: 1, doctorId: 1, diagnosis: 'Flu' } as Partial<MedicalRecordData>; // Missing fields
        const result = await isValidMedicalRecordData(data as MedicalRecordData);
        expect(result.status).toBe(400);
        expect(result.message).toBe("Field 'dateOfVisit' is required.");
    });

    it('should return 404 if patient does not exist', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue(null);
        const data = { patientId: 1, doctorId: 1, dateOfVisit: new Date('2024-05-01'), diagnosis: 'Flu', treatment: 'Rest' };
        const result = await isValidMedicalRecordData(data);
        expect(result.status).toBe(404);
        expect(result.message).toBe('The patient does not exist.');
    });

    it('should return 404 if doctor does not exist', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        (DoctorModel.getDoctorById as jest.Mock).mockResolvedValue(null);
        const data = { patientId: 1, doctorId: 1, dateOfVisit: new Date('2024-05-01'), diagnosis: 'Flu', treatment: 'Rest' };
        const result = await isValidMedicalRecordData(data);
        expect(result.status).toBe(404);
        expect(result.message).toBe('The doctor does not exist');
    });

    it('should return 200 if all required fields are present and patient and doctor exist', async () => {
        (PatientModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        (DoctorModel.getDoctorById as jest.Mock).mockResolvedValue({ id: 1 });
        const data = { patientId: 1, doctorId: 1, dateOfVisit: new Date('2024-05-01'), diagnosis: 'Flu', treatment: 'Rest' };
        const result = await isValidMedicalRecordData(data);
        expect(result.status).toBe(200);
    });

    it('should return 404 if medical record does not exist for update', async () => {
        const data = { id: 1, dateOfVisit: new Date('2024-05-01'), diagnosis: 'Flu', treatment: 'Rest' };
        (MedicalRecordModel.findOne as jest.Mock).mockResolvedValue(null);
        const result = await isValidMedicalRecordUpdateData(data);
        expect(result.status).toBe(404);
        expect(result.message).toBe('Medical record not found.');
    });

    it('should return 200 if medical record exists for update', async () => {
        const data = { id: 1, dateOfVisit: new Date('2024-05-01'), diagnosis: 'Flu', treatment: 'Rest' };
        (MedicalRecordModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        const result = await isValidMedicalRecordUpdateData(data);
        expect(result.status).toBe(200);
    });

    it('should return 404 if medical record does not exist for deletion', async () => {
        (MedicalRecordModel.findOne as jest.Mock).mockResolvedValue(null);
        const result = await isValidMedicalRecordDelete(1);
        expect(result.status).toBe(404);
        expect(result.message).toBe('Medical record not found.');
    });

    it('should return 200 if medical record exists for deletion', async () => {
        (MedicalRecordModel.findOne as jest.Mock).mockResolvedValue({ id: 1 });
        const result = await isValidMedicalRecordDelete(1);
        expect(result.status).toBe(200);
    });
});
