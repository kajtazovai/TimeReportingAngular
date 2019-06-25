import { Employee } from './employee';

export class Timereport {

    private _date: Date;
    private _hours: number;
    private _employeeId :number;
    private _projectId:number;
    private _projectName:string;
    private _employeeName:string;
    private _id : number;



  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get projectName(): string {
    return this._projectName;
  }

  set projectName(value: string) {
    this._projectName = value;
  }

  get employeeName(): string {
    return this._employeeName;
  }

  set employeeName(value: string) {
    this._employeeName = value;
  }

  get employeeId(): number {
    return this._employeeId;
  }

  set employeeId(value: number) {
    this._employeeId = value;
  }

  get projectId(): number {
    return this._projectId;
  }

  set projectId(value: number) {
    this._projectId = value;
  }
  constructor(hours: number,employeeId:number,projectId:number,employeeName:string,projectName:string,id:number,date:Date) {
    this._hours = hours;
    this._employeeId = employeeId;
    this._projectId = projectId;
    this._projectName = projectName;
    this._employeeName=employeeName;
    this._id  = id;
    this._date = date;
  
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    this._hours = value;
  }


 
}
