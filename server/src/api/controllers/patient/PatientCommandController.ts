// src/api/controllers/patient/PatientCommandController.ts
import { Request, Response } from 'express';
import { PatientCommandService } from '../../services/patient/PatientCommandService';

export class PatientCommandController {
    static async createPatient(req: Request, res: Response) {
        try {
            const patientData = req.body;
            const newPatient = await PatientCommandService.createPatient(patientData);
            res.status(201).json(newPatient);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updatePatient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const patientData = req.body;
            const updatedPatient = await PatientCommandService.updatePatient(id, patientData);
            res.json(updatedPatient);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deletePatient(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            await PatientCommandService.deletePatient(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
