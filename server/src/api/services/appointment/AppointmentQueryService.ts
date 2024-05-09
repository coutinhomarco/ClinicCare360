import { AppointmentModel } from '../../models/AppointmentModel';

export class AppointmentQueryService {
    static async listAppointments() {
        return AppointmentModel.findAll();
    }

    static async getAppointment(id: number) {
        return AppointmentModel.findOne(id);
    }
}
