export class Project{
   private _name:string;
   private _budget:number;
   private _id:number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get budget(): number {
    return this._budget;
  }

  set budget(value: number) {
    this._budget = value;
  }

  constructor(name: string,id:number,budget:number) {
    this._name = name;
    this._id = id;
    this._budget = budget;
  }


}
