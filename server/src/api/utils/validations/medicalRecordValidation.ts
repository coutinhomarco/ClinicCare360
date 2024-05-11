import { PatientModel } from '../../models/PatientModel';
import { DoctorModel } from '../../models/DoctorModel';
import { MedicalRecordModel } from '../../models/MedicalRecordModel';
export interface MedicalRecordData {
    patientId: number;
    doctorId: number;
    dateOfVisit: Date;
    diagnosis: string;
    treatment: string;
}

export async function isValidMedicalRecordData(data: any): Promise<{status: number, message: string | undefined}> {
    const patient = await PatientModel.findOne(data.patientId);
    if (!patient) {
        return { status: 404, message: 'The patient related to this medical record does not exist.' };
    }
    const doctor = await DoctorModel.getDoctorById(data.doctorId);
    if (!doctor) {
        return { status: 404, message: 'The doctor related to this medical record does not exist' };
    }
    const validation = typeof data.patientId === 'number' &&
        typeof data.doctorId === 'number' &&
        data.dateOfVisit instanceof Date &&
        typeof data.diagnosis === 'string' &&
        typeof data.treatment === 'string';
    return { status: validation ? 200 : 400, message: validation ? undefined : 'Invalid medical record data'};
}


export async function isValidMedicalRecordUpdateData(data: any): Promise<{status: number, message: string | undefined}> {
    const patient = await PatientModel.findOne(data.patientId);
    if (!patient) {
        return { status: 404, message: 'The patient related to this medical record does not exist.' };
    }
    const doctor = await DoctorModel.getDoctorById(data.doctorId);
    if (!doctor) {
        return { status: 404, message: 'The doctor related to this medical record does not exist' };
    }
    const medicalRecord = await MedicalRecordModel.findOne(data.id);
    if (!medicalRecord) {
        return { status: 404, message: 'Medical record not found.' };
    }
    const fieldsToUpdate = Object.keys(data) as (keyof MedicalRecordData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    return { status: 200, message:undefined};
}

export async function isValidDelete(id: any): Promise<{status: number, message: string | undefined}> {
    const validation = typeof id === 'number';
    const medicalRecord = await MedicalRecordModel.findOne(id);
    if (!medicalRecord) {
        return { status: 404, message: 'Medical record not found.' };
    }
    return { status: validation ? 200 : 400, message: validation ? undefined : 'Invalid medical record data'};
}