import { Request, Response } from 'express';
import { PatientService } from '../../services/patient/patientService';

export class PatientController {
    static async listPatients(req: Request, res: Response) {
        try {
            const patients = await PatientService.listPatients();
            res.json(patients);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getPatient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const patient = await PatientService.getPatient(id);
            if (patient) {
                res.json(patient);
            } else {
                res.status(404).json({ message: "Patient not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createPatient(req: Request, res: Response) {
        try {
            const patientData = req.body;
            const newPatient = await PatientService.createPatient(patientData);
            res.status(201).json(newPatient);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updatePatient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const patientData = req.body;
            const updatedPatient = await PatientService.updatePatient(id, patientData);
            res.json(updatedPatient);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deletePatient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await PatientService.deletePatient(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
