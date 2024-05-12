export interface AppointmentData {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    status: string;
}