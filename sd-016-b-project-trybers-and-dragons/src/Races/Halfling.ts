import Race from './Race';

export default class Halfling extends Race {
  private static _halflingCount = 0;
  private _maxlifePoints: number;
  
  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Halfling._halflingCount += 1;
    this._maxlifePoints = 60;
  }
  
  public get maxLifePoints(): number {
    return this._maxlifePoints;
  }
  
  public static createdRacesInstances(): number {
    return Halfling._halflingCount;
  }
}