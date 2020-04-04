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


export const desconectar = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('disconnect', () => {
        const user = usuariiosConectado.borrarUsuario(cliente.id);
        console.log('user delete', user);
        io.emit('usuarios-activos', usuariiosConectado.getLista());
    });


};

//escuchar mensaje
export const mensaje = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        io.emit('mensaje-nuevo', payload);
    });
};


//config user
export const configurarUsuario = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('configurar-usuario', (payload: { idUsuario: string, nombre: string }, callback: Function) => {
        usuariiosConectado.actualizarUsuario(cliente.id, payload.idUsuario, payload.nombre);
        //   io.emit('usuarios-activos', usuariiosConectado.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });

    });
};

//config user
export const obtenerUsuarios = (cliente: Socket, io: sockectIO.Server) => {

    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', usuariiosConectado.getLista());
    });
};


export const notificarNuevoTicket = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('notificar-nuevo-ticket', (payload: { idRita: string, pedidoId: number }, callback: Function) => {
        const user = usuariiosConectado.getUsuarioPorIdUser(payload.idRita);
        //   io.emit('escuchar-nuevo-ticket', user);
        console.log('=>', user);
        if (user?.id) {
            io.to(user.id).emit('escuchar-nuevo-ticket', { user, pedidoid: payload.pedidoId });
            callback({
                ok: true,
                mensaje: 'Ok!'
            });
        }
        else {
            callback({
                ok: false,
                mensaje: 'No se obtuvo el id'
            });
        }

    });
};


export const emitirEstadoRita = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('emitir-estado-rita', (payload: { idCliente: number }, callback: Function) => {
        const user = usuariiosConectado.getUsuarioPorIdUser(payload.idCliente);
        console.log('=>', user);
        if (user?.id) {
            io.to(user.id).emit('escuchar-rita-disponible', { user });
            callback({
                ok: true,
                mensaje: 'Ok!'
            });
        }
        else {
            callback({
                ok: false,
                mensaje: 'No se obtuvo el id'
            });
        }

    });
};


export const enviarConfirmacionCliente = (cliente: Socket, io: sockectIO.Server) => {
    cliente.on('enviar-confirmacion-cliente', (payload: { idRita: string, pedidoId: number }, callback: Function) => {
        const user = usuariiosConectado.getUsuarioPorIdUser(payload.idRita);
        if (user?.id) {
            io.to(user.id).emit('escuchar-preparar-jugo', { user, pedidoid: payload.pedidoId });
            callback({
                ok: true,
                mensaje: 'Ok!'
            });
        }
        else {
            callback({
                ok: false,
                mensaje: 'No se obtuvo el id'
            });
        }

    });
};


