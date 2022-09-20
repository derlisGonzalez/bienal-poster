import { CriterioModel } from "./criterio.model";
import { EvaluadorModel } from "./evaluador.model";

export class ProyectoModel {

    id: string;
    codigo?: string;
    titulo?: string;
    cuerpo?: string;
    autor?: string;
    autor2?: string;
    estado?: boolean = true;
    totalPuntaje?: number = 0;
    promedio?: number = 0;
    evaluador1?: EvaluadorModel;
    evaluador2?: EvaluadorModel;
    evaluador3?: EvaluadorModel;

    //lista de evaluadores
    //se agraga uno o mas evaluadores
    //evaluadores?: EvaluadorModel[];

    //criterios?: CriterioModel[];
    //criterios?: string; // se crea un array para cargar todos los criterios
    
}