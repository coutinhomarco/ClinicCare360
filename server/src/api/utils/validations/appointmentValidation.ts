export interface AppointmentData {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    status: string;
}

export function isValidAppointmentData(data: any): data is AppointmentData {
    return typeof data.patientId === 'number' &&
           typeof data.doctorId === 'number' &&
           data.appointmentDate instanceof Date &&
           data.startTime instanceof Date &&
           data.endTime instanceof Date &&
           typeof data.status === 'string';
}