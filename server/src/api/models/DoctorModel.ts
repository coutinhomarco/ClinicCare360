import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DoctorModel {
    static async getAllDoctors() {
        return await prisma.doctor.findMany();
    }

    static async getDoctorById(id: number) {
        return await prisma.doctor.findUnique({
            where: { id }
        });
    }

    static async createDoctor(doctorData: any) {
        console.log('Creating doctor with data:', doctorData);
        
        return await prisma.doctor.create({
            data: doctorData
        });
    }

    static async updateDoctor(id: number, doctorData: { [key: string]: any }) {
        return await prisma.doctor.update({
            where: { id },
            data: doctorData
        });
    }

    static async deleteDoctor(id: number) {
        return await prisma.doctor.delete({
            where: { id }
        });
    }
}
