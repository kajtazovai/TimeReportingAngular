export class Role {
    private _name:string;
    private _id :number;

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

  constructor(id:number) {
    this._id = id;
  }
}
