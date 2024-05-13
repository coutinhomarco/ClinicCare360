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
            await UserCommandService.createUser(job.data);
            break;
        case 'updateUser':
            await UserCommandService.updateUser(job.data.id, job.data);
            break;
        case 'deleteUser':
            await UserCommandService.deleteUser(job.data.id);
            break;
        case 'loginUser':
            await UserCommandService.loginUser(job.data.email, job.data.password);
            break;
        case 'createAppointment':
            await AppointmentCommandService.createAppointment(job.data);
            break;
        case 'updateAppointment':
            await AppointmentCommandService.updateAppointment(job.data.id, job.data);
            break;
        case 'deleteAppointment':
            await AppointmentCommandService.deleteAppointment(job.data.id);
            break;
        case 'createDoctor':
            await DoctorCommandService.createDoctor(job.data);
            break;
        case 'updateDoctor':
            await DoctorCommandService.updateDoctor(job.data.id, job.data);
            break;
        case 'deleteDoctor':
            await DoctorCommandService.deleteDoctor(job.data.id);
            break;
        case 'createMedicalRecord':
            await MedicalRecordCommandService.createMedicalRecord(job.data);
            break;
        case 'updateMedicalRecord':
            await MedicalRecordCommandService.updateMedicalRecord(job.data.id, job.data);
            break;
        case 'deleteMedicalRecord':
            await MedicalRecordCommandService.deleteMedicalRecord(job.data.id);
            break;
        case 'createPatient':
            await PatientCommandService.createPatient(job.data);
            break;
        case 'updatePatient':
            await PatientCommandService.updatePatient(job.data.id, job.data);
            break;
        case 'deletePatient':
            await PatientCommandService.deletePatient(job.data.id);
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
            const userListResult = await UserQueryService.listUsers();
            console.log('Returning user list result:', userListResult.data);
            return userListResult.data;
        case 'getUser':
            const userResult = await UserQueryService.findUser(job.data.id);
            console.log('Returning user result:', userResult.data);
            return userResult.data;
        case 'listAppointments':
            const appointmentListResult = await AppointmentQueryService.listAppointments();
            console.log('Returning appointment list result:', appointmentListResult.data);
            return appointmentListResult.data;
        case 'getAppointment':
            const appointmentResult = await AppointmentQueryService.getAppointment(job.data.id);
            console.log('Returning appointment result:', appointmentResult.data);
            return appointmentResult.data;
        case 'listDoctors':
            const doctorListResult = await DoctorQueryService.listDoctors();
            console.log('Returning doctor list result:', doctorListResult.data);
            return doctorListResult.data;
        case 'getDoctor':
            const doctorResult = await DoctorQueryService.findDoctor(job.data.id);
            console.log('Returning doctor result:', doctorResult.data);
            return doctorResult.data;
        case 'listMedicalRecords':
            const medicalRecordListResult = await MedicalRecordQueryService.listMedicalRecords();
            console.log('Returning medical record list result:', medicalRecordListResult.data);
            return medicalRecordListResult.data;
        case 'getMedicalRecord':
            const medicalRecordResult = await MedicalRecordQueryService.getMedicalRecord(job.data.id);
            console.log('Returning medical record result:', medicalRecordResult.data);
            return medicalRecordResult.data;
        case 'generateAtestado':
            const atestadoResult = await MedicalRecordQueryService.generateAtestado(job.data.id);
            console.log('Returning atestado result:', atestadoResult.data);
            return atestadoResult.data;
        case 'listPatients':
            const patientListResult = await PatientQueryService.listPatients();
            console.log('Returning patient list result:', patientListResult.data);
            return patientListResult.data;
        case 'getPatient':
            const patientResult = await PatientQueryService.getPatient(job.data.id);
            console.log('Returning patient result:', patientResult.data);
            return patientResult.data;
        // Add other query handlers here
        default:
            console.log(`Unknown query job: ${job.name}`);
    }
}, { connection });
