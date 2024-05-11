import { DoctorModel } from "../../models/DoctorModel";
export interface DoctorData {
    userId: number;
    specialization: string;
    availability: string; // Assuming this is a JSON string
}

export async function isValidDoctorData(data: any): Promise<{status: number, message: string | undefined}> {
    const doctor = await DoctorModel.getDoctorById(data.email);
    const fieldsToUpdate = Object.keys(data) as (keyof DoctorData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    if (doctor) {
        return { status: 400, message: 'The user already is a doctor' };
    }
    return { status: 200, message: undefined };
}   

export async function isValidDoctorDataForUpdate(id: number, data: any): Promise<{status: number, message: string | undefined}> {
    const fieldsToUpdate = Object.keys(data) as (keyof DoctorData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    return { status: 200, message: undefined };
}   

export async function isValidDoctorDelete(id: any): Promise<{status: number, message: string | undefined}> {
    const validation = typeof id === 'number';
    const doctor = await DoctorModel.getDoctorById(id);
    if (!doctor) {
        return { status: 404, message: 'Doctor not found.' };
    }
    return { status: validation ? 200 : 400, message: validation ? undefined : 'Doctor id missing'};
}   