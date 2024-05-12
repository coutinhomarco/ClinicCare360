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
        const result = await DoctorCommandService.createDoctor(doctorData);
        return res.status(result.status).json({ message: "Doctor created sucessfuly" });
    }

    static async updateDoctor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const doctorData = req.body;
        const { status, message } = await isValidDoctorUpdateData(doctorData);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        const result = await DoctorCommandService.updateDoctor(id, doctorData);
        return res.status(result.status).json({ message: "Doctor updated sucessfuly"});
    }

    static async deleteDoctor(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidDoctorDelete(Number(id));
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await DoctorCommandService.deleteDoctor(Number(id));

        return res.status(status).json({ message: 'Doctor deleted successfully'});
    }
}
