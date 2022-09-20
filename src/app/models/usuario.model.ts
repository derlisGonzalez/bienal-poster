import { CategoriaModel } from "./categoria.model";
import { CarreraModel } from "./carrera.model";
export class UsuarioModel {
    public nombre: string;
    public documento: string;
    public password?: string;
    public categoria?: CategoriaModel;
    public carrera?: CarreraModel;
    public rol?: string;
    public uid?: string;
    constructor( ) {}


}