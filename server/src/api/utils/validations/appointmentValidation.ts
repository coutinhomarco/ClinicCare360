import { AppointmentModel } from "../../models/AppointmentModel";
import { AppointmentData } from '../interfaces/appointment/appointmentValidation';

function isFieldMissing(data: any, fields: string[]): string | null {
    for (const field of fields) {
        if (data[field] === undefined || data[field] === null) {
            return `Field '${field}' is required.`;
        }
    }
    return null;
}

export async function isValidAppointmentData(data: AppointmentData): Promise<{ status: number, message: string | undefined }> {
    let message = isFieldMissing(data, ['patientId', 'doctorId', 'appointmentDate', 'startTime', 'endTime', 'status']);
    if (message) return { status: 400, message };
    return { status: 200, message: undefined };
}

export async function isValidAppointmentUpdateData(data: AppointmentData): Promise<{ status: number, message: string | undefined }> {
    let message = isFieldMissing(data, ['appointmentDate', 'startTime', 'endTime', 'status']);
    if (message) return { status: 400, message };
    return { status: 200, message: undefined };
}

export async function isValidAppointmentDelete(id: number): Promise<{ status: number, message: string | undefined }> {
    const appointmentExists = await AppointmentModel.findOne(id);
    if (!appointmentExists) {
        return { status: 404, message: 'Appointment not found.' };
    }
    return { status: 200, message: undefined };
}
