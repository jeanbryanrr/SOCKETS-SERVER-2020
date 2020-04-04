export class Usuario {
    public id: string;
    public idUsuario: string;
    public nombre: string;
    public sala: string;
    constructor(id: string) {
        this.id = id;
        this.nombre = 'Sin-Nombre';
        this.sala = 'Sin sala';
        this.idUsuario = '';

    }
}