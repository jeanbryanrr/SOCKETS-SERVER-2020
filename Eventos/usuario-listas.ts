import { Usuario } from "../clases/usuario";

export class UsuarioListas {
    private lista: Usuario[] = [];

    constructor() {

    }

    public agregarUsuario(usuario: Usuario) {

        this.lista.push(usuario);
        console.log('usuario registrado', usuario);
        return usuario;

    }

    public actualizarNombre(id: string, nombre: string) {

        for (const iterator of this.lista) {
            if (iterator.id === id) {

                iterator.nombre = nombre;
                break;

            }
        }

        console.log('Actualizando usuario',this.lista);
        
    }


    public getLista() {
        return this.lista.filter(user=>{
            return user.nombre !== 'Sin-Nombre';
        });
    }


    public getUsuario(id: string) {

        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }

    public getUsuarioSala(sala: string) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }


    public borrarUsuario(id: string) {

        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(user => {
            return user.id !== id;
        });

        return tempUser;
    }
}