import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Persona } from '../model/Persona';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {


  db: SQLiteObject = null;

  constructor() { }

  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db
    };
  }

  createTables(): Promise<any> {
    let tables = `
    CREATE TABLE IF NOT EXISTS sesion_data
    (
      user_name TEXT PRIMARY KEY NOT NULL,
      password INTEGER NOT NULL,
      active INTEGER(1) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS perfil
    (
      id NUMBER PRIMARY KEY AUTOINCREMENT,
      rut TEXT NOT NULL,
      nombre TEXT NOT NULL,
      numero TEXT NOT NULL,
      email TEXT NOT NULL,
      carrera TEXT NOT NULL,
      sede TEXT NOT NULL
    );`;
    return this.db.executeSql(tables);
  }

  sesionActive() {

    let sql = `SELECT user_name,active FROM sesion_data WHERE active=1 LIMIT 1`;

    return this.db.executeSql(sql, [])

      .then(response => {
        return Promise.resolve(response.rows.item(0));
      });
  }
  /**
   * Función que valida la existencia del usuario que esta iniciando sesión
   * @param sesion Datos de inicio de sesión Usuario y Password
   */
  getSesionData(sesion: any) {
    let sql = `SELECT user_name, active FROM sesion_data
    WHERE user_name=? AND password=? LIMIT 1`;
    return this.db.executeSql(sql, [sesion.Usuario,
    sesion.Password]).then(response => {
      return Promise.resolve(response.rows.item(0));
    });
  }
  /**
   * Función que crea un nuevo registro de inicio de sesión
   * @param sesion Datos de inicio de sesión Usuario, Password y Active
   */
  createSesionData(sesion: any) {
    let sql = `INSERT INTO sesion_data(user_name,password,active)
    VALUES(?,?,?)`;
    return this.db.executeSql(sql, [sesion.Usuario,
    sesion.Password, sesion.Active]).then(response => {
      return Promise.resolve(response.rows.item(0));
    });;
  }
  updateSesionData(sesion: any) {
    let sql = `UPDATE sesion_data
    SET active=?
    WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.active, sesion.user_name]);
  }

  getNombreUsuario(sesion: any) {
    let sql = `SELECT user_name FROM sesion_data WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.Usuario]).then(response => {
      return Promise.resolve(response.rows.item(0));
    });
  }

  updateContrasenna(sesion: any) {
    let sql = `UPDATE sesion_data
    SET password=?
    WHERE user_name=?`;
    return this.db.executeSql(sql, [sesion.password, sesion.user_name]);
  }

  createPerfil() {
    let sql = `INSERT INTO perfil(rut,nombre,numero,email,carrera,sede,fk_user_name)
    VALUES('','','','','','')`;
    return this.db.executeSql(sql, []).then(response => {
      return Promise.resolve(response.rows.item(0));
    });;
  }

}