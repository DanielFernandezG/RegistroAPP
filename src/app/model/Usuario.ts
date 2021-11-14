export class Usuario {
    public nombreUsuario = '';
    public password = '';

    public validarNombreUsuario(): string {
        if (this.nombreUsuario.trim() === '') {
            return 'El nombre de usuario no puede estar en blanco.';
        }
        if (this.nombreUsuario.length < 3 || this.nombreUsuario.length > 9) {
            return 'El nombre de usuario debe tener entre 3 y 9 caracteres.';
        }
        return '';
    }

    public validarPassword(): string {
        if (this.password.trim() === '') {
            return 'Debe ingresar la contraseña.';
        }
        for (let i = 0; i < this.password.length; i++) {
            if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
                return 'La contraseña debe ser numérica.';
            }
        }
        if (this.password.length !== 4) {
            return 'La contraseña debe ser numérica de 4 dígitos.';
        }
        return '';
    }

    public validarUsuario(): string {
        return this.validarNombreUsuario()
            || this.validarPassword();
    }
}