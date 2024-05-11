import { AppointmentModel } from '../../models/AppointmentModel';
interface AppointmentData {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    status: string;
}
interface ServiceResponse<T> {
    status: number;
    data?: T;
    message?: string;
}

function isValidAppointmentData(data: any): data is AppointmentData {
    return 'patientId' in data && 'doctorId' in data && 'appointmentDate' in data &&
           'startTime' in data && 'endTime' in data && 'status' in data;
}


export class AppointmentCommandService {
    static async createAppointment(appointmentData: any): Promise<ServiceResponse<any>> {
        if (!isValidAppointmentData(appointmentData)) {
            return { status: 400, message: 'Invalid appointment data' };
        }
        const newAppointment = await AppointmentModel.create(appointmentData);
        return { status: 201, data: newAppointment };
    }

    static async updateAppointment(id: number, appointmentData: any): Promise<ServiceResponse<any>> {
        if (Object.keys(appointmentData).length === 0) {
            return { status: 400, message: 'No data provided for update' };
        }
        const updatedAppointment = await AppointmentModel.update(id, appointmentData);
        return { status: 200, data: updatedAppointment };
    }

    static async deleteAppointment(id: number): Promise<ServiceResponse<void>> {
        await AppointmentModel.delete(id);
        return { status: 204 };
    }
}

