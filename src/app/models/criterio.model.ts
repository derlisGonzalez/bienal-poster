
export class CriterioModel {

    id: string;
    descripcion: string;
    puntajeAsignado?: number; //aqui se puede definir un valor default
                              // al crear un criterio ya creara con el 
                              //valor talvez no seria el comportamiento  deseado
                              //
    
}
