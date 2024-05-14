// src/config/bullmq.ts
import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { UserCommandService } from '../api/services/user/UserCommandService';
import { UserModel } from '../api/models/UserModel';
import { AppointmentModel } from '../api/models/AppointmentModel';
import { DoctorModel } from '../api/models/DoctorModel';
import { MedicalRecordModel } from '../api/models/MedicalRecordModel';
import { PatientModel } from '../api/models/PatientModel';

const connection = new IORedis({
    maxRetriesPerRequest: null,
});

export const commandQueue = new Queue('commandQueue', { connection });
export const queryQueue = new Queue('queryQueue', { connection });

export const commandQueueEvents = new QueueEvents('commandQueue', { connection });
export const queryQueueEvents = new QueueEvents('queryQueue', { connection });

export const commandWorker = new Worker('commandQueue', async job => {
    try {
        console.log(`Processing command job ${job.name} with data ${JSON.stringify(job.data)}`);
        switch (job.name) {
            case 'createUser':
                await UserModel.createUser(job.data);
                break;
            case 'updateUser':
                await UserModel.updateUser(job.data.id, job.data);
                break;
            case 'deleteUser':
                await UserModel.deleteUser(job.data.id);
                break;
            case 'loginUser':
                await UserCommandService.loginUser(job.data.email, job.data.password);
                break;
            case 'createAppointment':
                await AppointmentModel.create(job.data);
                break;
            case 'updateAppointment':
                await AppointmentModel.update(job.data.id, job.data);
                break;
            case 'deleteAppointment':
                await AppointmentModel.delete(job.data.id);
                break;
            case 'createDoctor':
                await DoctorModel.createDoctor(job.data);
                break;
            case 'updateDoctor':
                await DoctorModel.updateDoctor(job.data.id, job.data);
                break;
            case 'deleteDoctor':
                await DoctorModel.deleteDoctor(job.data.id);
                break;
            case 'createMedicalRecord':
                await MedicalRecordModel.create(job.data);
                break;
            case 'updateMedicalRecord':
                await MedicalRecordModel.update(job.data.id, job.data);
                break;
            case 'deleteMedicalRecord':
                await MedicalRecordModel.delete(job.data.id);
                break;
            case 'createPatient':
                await PatientModel.create(job.data);
                break;
            case 'updatePatient':
                await PatientModel.update(job.data.id, job.data);
                break;
            case 'deletePatient':
                await PatientModel.delete(job.data.id);
                break;
            // Add other command handlers here
            default:
                console.log(`Unknown command job: ${job.name}`);
        }
        console.log(`Command job ${job.name} processed successfully`);
    } catch (error) {
        console.error(`Error processing command job ${job.name}:`, error);
    }
}, { connection });



export const queryWorker = new Worker('queryQueue', async job => {
    console.log(`Processing query job ${job.name} with data ${JSON.stringify(job.data)}`);
    switch (job.name) {
        case 'listUsers':
            return await UserModel.getAllUsers();;
        case 'getUser':
            return await UserModel.getUserById(job.data.id);
        case 'listAppointments':
            return await AppointmentModel.findAll();;
        case 'getAppointment':
            return  await AppointmentModel.findOne(Number(job.id));
        case 'listDoctors':
            return await DoctorModel.getAllDoctors();;
        case 'getDoctor':
            return await DoctorModel.getDoctorById(Number(job.id));;
        case 'listMedicalRecords':
            return await MedicalRecordModel.findAll();;
        case 'getMedicalRecord':
            return await MedicalRecordModel.findOne(Number(job.id));
        case 'generateAtestado':
            return await MedicalRecordModel.generateAtestado(Number(job.id));
        case 'listPatients':
            return await PatientModel.findAll();
        case 'getPatient':
            return await PatientModel.findOne(Number(job.id));
        // Add other query handlers here
        default:
            console.log(`Unknown query job: ${job.name}`);
    }
}, { connection });
