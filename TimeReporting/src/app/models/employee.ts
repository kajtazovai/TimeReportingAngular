import { Timereport } from './timereport';
import { Role } from './role';
import { Project } from './project';

export class Employee{
  get totalHours(): number {
    return this._totalHours;
  }

  set totalHours(value: number) {
    this._totalHours = value;
  }
    private _id : number;
    private _firstName : string;
    private _lastName: string;
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
    private _totalHours:number;
    private _role:Role;
    private _projects:Array<Project>;
    get projects(): Array<Project>{
      return this._projects;
    }
    set projects(value:Array<Project>){
      this._projects = value;
    }
  get role(): Role{
    return this._role;
  }
  set role(value:Role){
    this._role = value;
  }
  get time(): Timereport {
    return this._time;
  }

  set time(value: Timereport) {
    this._time = value;
  }

  constructor(id: number, firstName: string, lastName: string, username: string, password: string, email: string, dateJoining: Date,embg:string,role:Role,projects:Array<Project>) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._username = username;
    this._password = password;
    this._email = email;
    this._dateJoining = dateJoining;
    this._embg  =  embg;
    this._role = role;
    this._projects = projects;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
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
