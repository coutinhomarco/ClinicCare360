import { PatientModel } from "../../models/PatientModel";

export interface PatientData {
    userId: number;
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    address: string;
}


export async function isValidPatientData(data: any): Promise<{status: number, message: string | undefined}> {
    const patient = await PatientModel.findOne(data.patientId);
    if (patient) {
        return { status: 500, message: 'A patient already exists with this id' };
    }
    const fieldsToUpdate = Object.keys(data) as (keyof PatientData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    return { status:200, message:undefined };
}


export async function isValidPatientUpdateData(data: any): Promise<{status: number, message: string | undefined}> {
    const patient = await PatientModel.findOne(data.patientId);
    if (!patient) {
        return { status: 404, message: 'A patient related to this id does not exists.' };
    }
    const fieldsToUpdate = Object.keys(data) as (keyof PatientData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    return { status: 200, message:undefined};
}

export async function isValidPatientDelete(id: any): Promise<{status: number, message: string | undefined}> {
    const validation = typeof id === 'number';
    const patient = await PatientModel.findOne(id);
    if (!patient) {
        return { status: 404, message: 'Patient record not found.' };
    }
    return { status: validation ? 200 : 400, message: validation ? undefined : 'Patient id is missing'};
}