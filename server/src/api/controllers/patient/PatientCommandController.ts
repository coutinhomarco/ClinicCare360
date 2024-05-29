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
        const patientToDb = {...patientData, dob: new Date(patientData.dob)}        
        const result = await PatientCommandService.createPatient(patientToDb);
        return res.status(result.status).json({ message: result.message, data: result.data.jobId });
    }

    static async updatePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const patientData = req.body;
        const result = await PatientCommandService.updatePatient(id, patientData);
        return res.status(result.status).json({ message: result.message, data: result.data.jobId });
    }

    static async deletePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const result = await PatientCommandService.deletePatient(id);
        res.status(result.status).json({ message: result.message, data: result.data.jobId });
    }
}
