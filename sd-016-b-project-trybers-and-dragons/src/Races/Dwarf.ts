import Race from './Race';

export default class Dwarf extends Race {
  private static _dwarfCount = 0;
  private _maxlifePoints: number;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    Dwarf._dwarfCount += 1;
    this._maxlifePoints = 80;
  }

  public get maxLifePoints(): number {
    return this._maxlifePoints;
  }

  public static createdRacesInstances(): number {
    return Dwarf._dwarfCount;
  }
}