import { Socket } from 'socket.io';
import sockectIO from 'socket.io';
import { UsuarioListas } from '../Eventos/usuario-listas';
import { Usuario } from '../clases/usuario';
export const usuariiosConectado = new UsuarioListas();


//escuchar mensaje
export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariiosConectado.agregarUsuario(usuario)
};

export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        const user = usuariiosConectado.borrarUsuario(cliente.id);
        console.log('user delete', user);
    });
};

//escuchar mensaje
export const mensaje = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {

        console.log('mensaje recibido ', payload);

        io.emit('mensaje-nuevo', payload);
    });
};


//config user
export const configurarUsuario = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        usuariiosConectado.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });

    });
};