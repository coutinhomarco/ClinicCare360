import { AppointmentModel } from '../../models/AppointmentModel';
import { isValidAppointmentData, AppointmentData, isValidAppointmentDataForUpdate, isValidAppointmentDelete} from '../../utils/validations/appointmentValidation';
import { ServiceResponse } from '../../../@types/ServiceResponse';



export class AppointmentCommandService {
    static async createAppointment(appointmentData: any): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidAppointmentData(appointmentData);
        if (status !== 200) {
            return { status, message };
        }
        await AppointmentModel.create(appointmentData);
        return { status, message: 'Appointment created successfully'};
    }

    static async updateAppointment(id: number, appointmentData: Partial<AppointmentData>): Promise<ServiceResponse<any>> {
        const { status, message } = await isValidAppointmentDataForUpdate(id,appointmentData);
        if (status !== 200) {
            return { status, message };
        }
        await AppointmentModel.update(id, appointmentData);
        return { status: 200, message: 'Appointment updated successfully'};
    }

    static async deleteAppointment(id: number): Promise<ServiceResponse<void>> {
        const { status, message } = await isValidAppointmentDelete(id);
        if (status !== 200) {
            return { status, message };
        }
        await AppointmentModel.delete(id);
        return { status: 204 };
    }
}