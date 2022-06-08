import Race from './Race';

export default class Orc extends Race {
  private static _orcCount = 0;
  private _maxlifePoints: number;
  
  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Orc._orcCount += 1;
    this._maxlifePoints = 74;
  }
  
  public get maxLifePoints(): number {
    return this._maxlifePoints;
  }
  
  public static createdRacesInstances(): number {
    return Orc._orcCount;
  }
}