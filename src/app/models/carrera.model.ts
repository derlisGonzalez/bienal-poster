import { EvaluadorModel } from "./evaluador.model";
import { ProyectoModel } from "./proyecto.model";


export class CarreraModel {

    id: string;
    descripcion: string;
    evaluadores?: EvaluadorModel[];
    proyectos?: ProyectoModel[];


}

