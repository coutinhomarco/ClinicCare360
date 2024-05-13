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
    switch (job.name) {
        // Appointment commands
        case 'createAppointment':
            await AppointmentCommandService.createAppointment(job.data);
            break;
        case 'updateAppointment':
            await AppointmentCommandService.updateAppointment(job.data.id, job.data);
            break;
        case 'deleteAppointment':
            await AppointmentCommandService.deleteAppointment(job.data.id);
            break;
        // Doctor commands
        case 'createDoctor':
            await DoctorCommandService.createDoctor(job.data);
            break;
        case 'updateDoctor':
            await DoctorCommandService.updateDoctor(job.data.id, job.data);
            break;
        case 'deleteDoctor':
            await DoctorCommandService.deleteDoctor(job.data.id);
            break;
        // Medical record commands
        case 'createMedicalRecord':
            await MedicalRecordCommandService.createMedicalRecord(job.data);
            break;
        case 'updateMedicalRecord':
            await MedicalRecordCommandService.updateMedicalRecord(job.data.id, job.data);
            break;
        case 'deleteMedicalRecord':
            await MedicalRecordCommandService.deleteMedicalRecord(job.data.id);
            break;
        // Patient commands
        case 'createPatient':
            await PatientCommandService.createPatient(job.data);
            break;
        case 'updatePatient':
            await PatientCommandService.updatePatient(job.data.id, job.data);
            break;
        case 'deletePatient':
            await PatientCommandService.deletePatient(job.data.id);
            break;
        // User commands
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
    }
}, { connection });

export const queryWorker = new Worker('queryQueue', async job => {
    switch (job.name) {
        // Appointment queries
        case 'listAppointments':
            return await AppointmentQueryService.listAppointments();
        case 'getAppointment':
            return await AppointmentQueryService.getAppointment(job.data.id);
        // Doctor queries
        case 'listDoctors':
            return await DoctorQueryService.listDoctors();
        case 'getDoctor':
            return await DoctorQueryService.findDoctor(job.data.id);
        // Medical record queries
        case 'listMedicalRecords':
            return await MedicalRecordQueryService.listMedicalRecords();
        case 'getMedicalRecord':
            return await MedicalRecordQueryService.getMedicalRecord(job.data.id);
        case 'generateAtestado':
            return await MedicalRecordQueryService.generateAtestado(job.data.id);
        // Patient queries
        case 'listPatients':
            return await PatientQueryService.listPatients();
        case 'getPatient':
            return await PatientQueryService.getPatient(job.data.id);
        // User queries
        case 'listUsers':
            return await UserQueryService.listUsers();
        case 'getUser':
            return await UserQueryService.findUser(job.data.id);
    }
}, { connection });
