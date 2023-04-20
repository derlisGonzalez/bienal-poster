import { CarreraModel } from "./carrera.model";
import { CriterioModel } from "./criterio.model";


export class EvaluadorModel {

    id: string;
    nombre: string;
    email?: string;
    carrera?: CarreraModel;
    criterios?: CriterioModel[]=[];
    documento?: string;
    password?: string;
    password2?: string;
    role?: string;
    habilitado?: boolean  = false;
    subtotal?: number;
    estado: boolean  = true;
    uid?: string;



}

