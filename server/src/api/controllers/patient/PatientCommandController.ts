import { Request, Response } from 'express';
import { PatientCommandService } from '../../services/patient/PatientCommandService';
import { isValidPatientData, isValidPatientDelete, isValidPatientUpdateData } from '../../utils/validations/patientValidation';

export class PatientCommandController {
    static async createPatient(req: Request, res: Response) {
        const patientData = req.body;        
        const { status, message } = await isValidPatientData(patientData);      
        if (status !== 200) {
            return res.status(status).json({ message });
        }  
        await PatientCommandService.createPatient(patientData);
        return res.status(status).json({ message: 'Patient created successfully' });

    }

    static async updatePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const patientData = req.body;
        const { status, message } = await isValidPatientUpdateData(id, patientData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }  
        await PatientCommandService.updatePatient(id, patientData);
        return res.status(status).json({ message: 'Patient updated successfully' });
    }

    static async deletePatient(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidPatientDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await PatientCommandService.deletePatient(Number(id));
        res.status(204).json({ message: 'Patient deleted successfully' });
    }
}
