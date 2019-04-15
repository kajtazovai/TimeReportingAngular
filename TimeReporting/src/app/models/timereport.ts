import {Project} from "./project";

export class Timereport {

    private _date: Date;
    private _hours: number;
    private _project:Project;

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


  get project(): Project {
    return this._project;
  }

  set project(value: Project) {
    this._project = value;
  }

  constructor(date: Date, hours: number, project: Project) {
    this._date = date;
    this._hours = hours;
    this._project = project;
  }
}
