import { Request, Response } from 'express';
import { DoctorCommandService } from '../../services/doctor/DoctorCommandService';
import {isValidDoctorDelete,isValidDoctorData, isValidDoctorUpdateData} from '../../utils/validations/doctorValidation';
export class DoctorCommandController {
    static async createDoctor(req: Request, res: Response) {
        const doctorData = req.body;
        const { status, message } = await isValidDoctorData(doctorData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const {status: statusFinal, message: messageFinal} = await DoctorCommandService.createDoctor(doctorData);
        return res.status(statusFinal).json({ message: messageFinal });
    }

    static async updateDoctor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const doctorData = req.body;
        const { status, message } = await isValidDoctorUpdateData(doctorData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const {status: statusFinal, message: messageFinal} = await DoctorCommandService.updateDoctor(id, doctorData);
        return res.status(statusFinal).json({ message: messageFinal});
    }

    static async deleteDoctor(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidDoctorDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const {status: statusFinal, message: messageFinal} = await DoctorCommandService.deleteDoctor(Number(id));

        return res.status(statusFinal).json({ message: messageFinal});
    }
}
