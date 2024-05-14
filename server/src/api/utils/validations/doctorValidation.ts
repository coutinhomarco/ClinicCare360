import { DoctorModel } from "../../models/DoctorModel";
import { DoctorData } from '../interfaces/doctor/doctorValidation';
import {DoctorUpdateData} from '../../utils/interfaces/doctor/doctorValidation';

function isFieldMissing(data: any, fields: string[]): string | null {
    for (const field of fields) {
        if (data[field] === undefined || data[field] === null) {
            return `Field '${field}' is required.`;
        }
    }
    return null;
}

export async function isValidDoctorData(data: DoctorData): Promise<{ status: number, message: string | undefined }> {
    const message = isFieldMissing(data, ['userId', 'specialization', 'availability', 'firstName', 'lastName']);
    if (message) return { status: 400, message };
    
    const doctor = await DoctorModel.getDoctorById(data.userId);
    if (doctor) return { status: 400, message: 'The user already is a doctor' };
    
    return { status: 200, message: undefined };
}

export async function isValidDoctorUpdateData(data: DoctorUpdateData): Promise<{ status: number, message: string | undefined }> {
    const message = isFieldMissing(data, ['specialization', 'availability']);
    if (message) return { status: 400, message };
    return { status: 200, message: undefined };
}

export async function isValidDoctorDelete(id: number): Promise<{ status: number, message: string | undefined }> {
    const doctor = await DoctorModel.getDoctorById(id);
    if (!doctor) {
        return { status: 404, message: 'Doctor not found.' };
    }
    return { status: 200, message: undefined };
}
