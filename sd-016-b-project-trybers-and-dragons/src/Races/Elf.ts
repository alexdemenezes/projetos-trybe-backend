import Race from './Race';

export default class Elf extends Race {
  private static _elfCount = 0;
  private _maxlifePoints: number;
  
  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Elf._elfCount += 1;
    this._maxlifePoints = 99;
  }
  
  public get maxLifePoints(): number {
    return this._maxlifePoints;
  }
  
  public static createdRacesInstances(): number {
    return Elf._elfCount;
  }
}