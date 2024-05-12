import { Request, Response } from 'express';
import { PatientCommandService } from '../../services/patient/PatientCommandService';
import { isValidPatientData, isValidPatientDelete, isValidPatientUpdateData } from '../../utils/validations/patientValidation';

export class PatientCommandController {
    static async createPatient(req: Request, res: Response) {
        const patientData = req.body;
        const { status, message } = await isValidPatientData(patientData);
        if (status === 200) {
            res.status(status).json({ message: 'Patient created successfully' });
        } else {
            res.status(status).json({ message: message });
        }
    }

    static async updatePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const patientData = req.body;
        const { status, message } = await isValidPatientUpdateData(patientData);
        if (status === 200) {
            res.status(status).json({ message: 'Patient updated successfully' });
        } else {
            res.status(status).json({ message: message });
        }
    }

    static async deletePatient(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidPatientDelete(id);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await PatientCommandService.deletePatient(Number(id));
        res.status(204).json({ message: 'Patient deleted successfully' });
    }
}
