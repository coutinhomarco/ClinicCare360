import {DoctorModel } from '../../models/DoctorModel';
import {PatientModel} from '../../models/PatientModel';
import {MedicalRecordModel} from '../../models/MedicalRecordModel';
import { MedicalRecordData } from '../interfaces/medicalRecord/medicalRecordValidation';

function isFieldMissing(data: any, fields: string[]): string | null {
    for (const field of fields) {
        if (data[field] === undefined || data[field] === null) {
            return `Field '${field}' is required.`;
        }
    }
    return null;
}

export async function isValidMedicalRecordData(data: MedicalRecordData): Promise<{ status: number, message: string | undefined }> {
    let message = isFieldMissing(data, ['patientId', 'doctorId', 'dateOfVisit', 'diagnosis', 'treatment']);
    if (message) return { status: 400, message };

    const patientExists = await PatientModel.findOne(data.patientId);
    if (!patientExists) return { status: 404, message: 'The patient does not exist.' };

    const doctorExists = await DoctorModel.getDoctorById(data.doctorId);
    if (!doctorExists) return { status: 404, message: 'The doctor does not exist' };

    return { status: 200, message: undefined };
}

export async function isValidMedicalRecordUpdateData(data: MedicalRecordData): Promise<{ status: number, message: string | undefined }> {
    let message = isFieldMissing(data, ['dateOfVisit', 'diagnosis', 'treatment']);
    if (message) return { status: 400, message };

    const medicalRecordExists =  data.id && await MedicalRecordModel.findOne(data.id);
    if (!medicalRecordExists) return { status: 404, message: 'Medical record not found.' };

    return { status: 200, message: undefined };
}

export async function isValidMedicalRecordDelete(id: number): Promise<{ status: number, message: string | undefined }> {
    const medicalRecordExists = await MedicalRecordModel.findOne(id);
    if (!medicalRecordExists) {
        return { status: 404, message: 'Medical record not found.' };
    }
    return { status: 200, message: undefined };
}
