export default abstract class Race {
  private _name: string;
  private _dexterity: number;

  constructor(name: string, dexteriity: number) {
    this._name = name;
    this._dexterity = dexteriity;
  }

  public get name() {
    return this._name;
  }

  public get dexterity() {
    return this._dexterity;
  }

  public static createdRacesInstances(): number {
    throw new Error('Not implemented');
  }

  public abstract get maxLifePoints(): number;
}