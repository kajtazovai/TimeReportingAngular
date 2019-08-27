export class Project{
   private _name:string;
   private _budget:Number;
   private _id:Number;
   private _hourlyPaid:Number;
  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
  }
  get hourlyPaid():Number{
    return this._hourlyPaid;
  }
  set hourlyPaid(value: Number){
    this._hourlyPaid=value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get budget(): Number {
    return this._budget;
  }

  set budget(value: Number) {
    this._budget = value;
  }

  constructor(name: string,id:Number,budget:Number,hourlyPaid:Number) {
    this._name = name;
    this._id = id;
    this._budget = budget;
    this._hourlyPaid=hourlyPaid;
  }


}
