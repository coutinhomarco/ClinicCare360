export interface AppointmentData {
    patientId: number;
    doctorId: number;
    appointmentDate: Date;
    startTime: Date;
    endTime: Date;
    status: string;
}

export interface AppointmentUpdateData {
    appointmentDate?: Date | undefined;
    startTime?: Date | undefined;
    endTime?: Date | undefined;
    status?: string | undefined;
    patientId?: number | undefined;
    doctorId?: number | undefined;
}