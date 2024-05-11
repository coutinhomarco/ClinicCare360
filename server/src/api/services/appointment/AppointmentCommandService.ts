import { AppointmentModel } from '../../models/AppointmentModel';
import { isValidAppointmentData, AppointmentData } from '../../utils/validations/appointmentValidation';
interface ServiceResponse<T> {
    status: number;
    data?: T;
    message?: string;
}


export class AppointmentCommandService {
    static async createAppointment(appointmentData: any): Promise<ServiceResponse<any>> {
        if (!isValidAppointmentData(appointmentData)) {
            return { status: 400, message: 'Invalid appointment data. Please ensure all fields are correctly formatted and provided.' };
        }
        const newAppointment = await AppointmentModel.create(appointmentData);
        return { status: 201, data: newAppointment };
    }

    static async updateAppointment(id: number, appointmentData: Partial<AppointmentData>): Promise<ServiceResponse<any>> {
        const fieldsToUpdate = Object.keys(appointmentData) as (keyof AppointmentData)[];
        for (const key of fieldsToUpdate) {
            if (appointmentData[key] === undefined) {
                return { status: 400, message: `Invalid data for field: ${key}` };
            }
        }
        
        const updatedAppointment = await AppointmentModel.update(id, appointmentData);
        return { status: 200, data: updatedAppointment };
    }

    static async deleteAppointment(id: number): Promise<ServiceResponse<void>> {
        await AppointmentModel.delete(id);
        return { status: 204 };
    }
}