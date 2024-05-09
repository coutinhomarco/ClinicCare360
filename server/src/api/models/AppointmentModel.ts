import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class AppointmentModel {
    static async findAll() {
        return await prisma.appointment.findMany();
    }

    static async findOne(id: number) {
        return await prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: true,
                doctor: true 
            }
        });
    }

    static async create(appointmentData: {
        patientId: number, 
        doctorId: number, 
        appointmentDate: Date, 
        startTime: Date, 
        endTime: Date, 
        status: string
    }) {
        return await prisma.appointment.create({
            data: appointmentData
        });
    }

    static async update(id: number, appointmentData: {
        patientId?: number, 
        doctorId?: number, 
        appointmentDate?: Date, 
        startTime?: Date, 
        endTime?: Date, 
        status?: string
    }) {
        return await prisma.appointment.update({
            where: { id },
            data: appointmentData
        });
    }

    static async delete(id: number) {
        return await prisma.appointment.delete({
            where: { id }
        });
    }
}
