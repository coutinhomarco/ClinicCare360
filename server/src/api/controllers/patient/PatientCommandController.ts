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
        const {status: statusFinal, message: messageFinal} = await PatientCommandService.createPatient(patientToDb);
        return res.status(statusFinal).json({ message: messageFinal});

    }

    static async updatePatient(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const patientData = req.body;
        const { status, message } = await isValidPatientUpdateData(id, patientData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }  
        const {status: statusFinal, message: messageFinal} = await PatientCommandService.updatePatient(id, patientData);
        return res.status(statusFinal).json({ message: messageFinal });
    }

    static async deletePatient(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidPatientDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const {status: statusFinal, message: messageFinal} = await PatientCommandService.deletePatient(Number(id));
        res.status(statusFinal).json({ message: messageFinal });
    }
}
