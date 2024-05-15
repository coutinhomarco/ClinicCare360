import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DoctorModel {
    static async getAllDoctors() {
        try {
            return await prisma.doctor.findMany();
        } catch (error) {
            console.error('Error getting all doctors:', error);
            throw error;
        }
    }

    static async getDoctorById(id: number) {
        try {
            return await prisma.doctor.findUnique({
                where: { id }
            });
        } catch (error) {
            console.error('Error getting by id doctors:', error);
            throw error;
        }
    }

    static async createDoctor(doctorData: any) {
        try {
            return await prisma.doctor.create({
                data: doctorData
            });
        } catch (error) {
            console.error('Error creating doctor:', error);
            throw error;
        }
    }

    static async updateDoctor(id: number, doctorData: { [key: string]: any }) {
        try {
            return await prisma.doctor.update({
                where: { id },
                data: doctorData
            });
        } catch (error) {
            console.error('Error updating doctor:', error);
            throw error;
        }
    }

    static async deleteDoctor(id: number) {
        try {
            return await prisma.doctor.delete({
                where: { id }
            });
        } catch (error) {
            console.error('Error deleting doctor:', error);
            throw error;
        }
    }
}
