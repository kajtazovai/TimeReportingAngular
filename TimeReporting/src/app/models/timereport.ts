import { Employee } from './employee';

export class Timereport {

    private _date: Date;
    private _hours: number;
    private _employeeId :number;
    private _projectId:number;


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

  constructor(hours: number,employeeId:number,projectId:number) {
    this._hours = hours;
    this._employeeId = employeeId;
    this._projectId = projectId;
  
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
