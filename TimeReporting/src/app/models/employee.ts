import { Timereport } from './timereport';

export class Employee{
    private _id : number;
    private _firstname : string;
    private _lastname: string;
    private _embg : string;
    private _mobile : string;
    private _street : string;
    private _city: string;
    private _username: string;
    private _password : string;
    private _email : string;
    private _dateJoining : Date;
    private _time:Timereport;
    private _projectId : number;

  get time(): Timereport {
    return this._time;
  }

  set time(value: Timereport) {
    this._time = value;
  }

  constructor(id: number, firstname: string, lastname: string, username: string, password: string, email: string, dateJoining: Date) {
    this._id = id;
    this._firstname = firstname;
    this._lastname = lastname;
    this._username = username;
    this._password = password;
    this._email = email;
    this._dateJoining = dateJoining;

  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get embg(): string {
    return this._embg;
  }

  set embg(value: string) {
    this._embg = value;
  }

  get mobile(): string {
    return this._mobile;
  }

  set mobile(value: string) {
    this._mobile = value;
  }

  get street(): string {
    return this._street;
  }

  set street(value: string) {
    this._street = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get dateJoining(): Date {
    return this._dateJoining;
  }

  set dateJoining(value: Date) {
    this._dateJoining = value;
  }
}
