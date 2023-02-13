import { CategoriaModel } from "./categoria.model";
import { CarreraModel } from "./carrera.model";
export class UsuarioModel {

    public id?: string;
    public nombre: string;
    public email: string;
    public password?: string;
    //public img?: string;
    //public google?: boolean;
    //public role?: 'ADMIN_ROLE' | 'USER_ROLE';
    public uid?: string
    constructor( ) {}


}