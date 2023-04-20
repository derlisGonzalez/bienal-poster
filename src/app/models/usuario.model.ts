import { CategoriaModel } from "./categoria.model";
import { CarreraModel } from "./carrera.model";
export class UsuarioModel {

    public id?: string;
    public nombre: string;
    public email: string;
    public password?: string;
    public password2?: string;
    //public img?: string;
    public estado?: boolean;
    public role?: string;
    public uid?: string
    constructor( ) {}
}