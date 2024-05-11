import { AppointmentModel } from "../../models/AppointmentModel";
export interface AppointmentData {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    status: string;
}

export  async function isValidAppointmentData(data: any): Promise<{status: number, message: string | undefined}> {
    const fieldsToUpdate = Object.keys(data) as (keyof AppointmentData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    return {status: 200, message: undefined}
}


export async function isValidAppointmentDataForUpdate(id: number, data: any): Promise<{status: number, message: string | undefined}> {
    const fieldsToUpdate = Object.keys(data) as (keyof AppointmentData)[];
    for (const key of fieldsToUpdate) {
        if (data[key] === undefined) {
            return { status: 400, message: `Invalid data for field: ${key}` };
        }
    }
    return { status: 200, message: undefined };
}   

export async function isValidAppointmentDelete(id: any): Promise<{status: number, message: string | undefined}> {
    const validation = typeof id === 'number';
    const apointment = await AppointmentModel.findOne(id);
    if (!apointment) {
        return { status: 404, message: 'Appointment not found.' };
    }
    return { status: validation ? 200 : 400, message: validation ? undefined : 'Appointment id missing'};
}   