export class Project{
   private _name:string;
   private _budget:number;

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

  constructor(name: string) {
    this._name = name;
  }
}
