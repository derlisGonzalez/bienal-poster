import { CarreraModel } from "./carrera.model";
import { CriterioModel } from "./criterio.model";


export class EvaluadorModel {

    id: string;
    nombre: string;
    carrera?: CarreraModel;
    criterios?: CriterioModel[]=[];
    documento?: string;
    password?: string;
    rol?: string;
    usuario?: string;
    subtotal?: number;
    estado: boolean  = true;



}

