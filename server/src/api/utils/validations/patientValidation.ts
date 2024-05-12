import { PatientModel } from "../../models/PatientModel";
import { PatientData } from '../interfaces/patient/patientValidation';

function isFieldMissing(data: any, fields: string[]): string | null {
    for (const field of fields) {
        if (data[field] === undefined || data[field] === null) {
            return `Field '${field}' is required.`;
        }
    }
    return null;
}

export async function isValidPatientData(data: PatientData): Promise<{ status: number, message: string | undefined }> {
    let message = isFieldMissing(data, ['userId', 'firstName', 'lastName', 'dob', 'gender', 'address']);
    if (message) return { status: 400, message };
    return { status: 200, message: undefined };
}

export async function isValidPatientUpdateData(data: PatientData): Promise<{ status: number, message: string | undefined }> {
    let message = isFieldMissing(data, ['firstName', 'lastName', 'dob', 'gender', 'address']);
    if (message) return { status: 400, message };
    return { status: 200, message: undefined };
}

export async function isValidPatientDelete(id: number): Promise<{ status: number, message: string | undefined }> {
    const patient = await PatientModel.findOne(id);
    if (!patient) {
        return { status: 404, message: 'Patient not found.' };
    }
    return { status: 200, message: undefined };
}
