import { Request, Response } from 'express';
import { DoctorCommandService } from '../../services/doctor/DoctorCommandService';
import {isValidDoctorDelete} from '../../utils/validations/doctorValidation';
export class DoctorCommandController {
    static async createDoctor(req: Request, res: Response) {
        const doctorData = req.body;
        const result = await DoctorCommandService.createDoctor(doctorData);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async updateDoctor(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const doctorData = req.body;
        const result = await DoctorCommandService.updateDoctor(id, doctorData);
        if (result.status === 200) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    }

    static async deleteDoctor(req: Request, res: Response) {
        const { id } = req.params;
        const { status, message } = await isValidDoctorDelete(id);
        if (status !== 200) {
            return res.status(status).json({ message });
        }
        await DoctorCommandService.deleteDoctor(Number(id));

        return res.status(status).json({ message: 'Doctor deleted successfully'});
    }
}
