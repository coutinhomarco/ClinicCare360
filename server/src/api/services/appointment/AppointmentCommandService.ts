import { AppointmentModel } from '../../models/AppointmentModel';

export class AppointmentCommandService {
    static async createAppointment(appointmentData: any) {
        return AppointmentModel.create(appointmentData);
    }

    static async updateAppointment(id: number, appointmentData: { [key: string]: any }) {
        return AppointmentModel.update(id, appointmentData);
    }

    static async deleteAppointment(id: number) {
        return AppointmentModel.delete(id);
    }
}
