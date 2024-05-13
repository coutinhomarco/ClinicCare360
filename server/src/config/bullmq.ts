// src/config/bullmq.ts
import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { AppointmentCommandService } from '../api/services/appointment/AppointmentCommandService';
import { AppointmentQueryService } from '../api/services/appointment/AppointmentQueryService';
import { DoctorCommandService } from '../api/services/doctor/DoctorCommandService';
import { DoctorQueryService } from '../api/services/doctor/DoctorQueryService';
import { MedicalRecordCommandService } from '../api/services/medicalRecord/MedicalRecordCommandService';
import { MedicalRecordQueryService } from '../api/services/medicalRecord/MedicalRecordQueryService';
import { PatientCommandService } from '../api/services/patient/PatientCommandService';
import { PatientQueryService } from '../api/services/patient/PatientQueryService';
import { UserCommandService } from '../api/services/user/UserCommandService';
import { UserQueryService } from '../api/services/user/UserQueryService';
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
}, { connection });

export const queryWorker = new Worker('queryQueue', async job => {
    console.log(`Processing query job ${job.name} with data ${JSON.stringify(job.data)}`);
    switch (job.name) {
        case 'listUsers':
            const userListResult = await UserModel.getAllUsers();
            return userListResult;
        case 'getUser':
            const userResult = await UserModel.getUserById(job.data.id);
            return userResult;
        case 'listAppointments':
            const appointmentListResult = await AppointmentModel.findAll();
            return appointmentListResult;
        case 'getAppointment':
            const appointmentResult = await AppointmentModel.findOne(Number(job.id));
            return appointmentResult;
        case 'listDoctors':
            const doctorListResult = await DoctorModel.getAllDoctors();
            return doctorListResult;
        case 'getDoctor':
            const doctorResult = await DoctorModel.getDoctorById(Number(job.id));
            return doctorResult;
        case 'listMedicalRecords':
            const medicalRecordListResult = await MedicalRecordModel.findAll();
            return medicalRecordListResult;
        case 'getMedicalRecord':
            const medicalRecordResult = await MedicalRecordModel.findOne(Number(job.id));
            return medicalRecordResult;
        case 'generateAtestado':
            const atestadoResult = await MedicalRecordModel.generateAtestado(Number(job.id));
            return atestadoResult;
        case 'listPatients':
            const patientListResult = await PatientModel.findAll();
            return patientListResult;
        case 'getPatient':
            const patientResult = await PatientModel.findOne(Number(job.id));
            return patientResult;
        // Add other query handlers here
        default:
            console.log(`Unknown query job: ${job.name}`);
    }
}, { connection });
