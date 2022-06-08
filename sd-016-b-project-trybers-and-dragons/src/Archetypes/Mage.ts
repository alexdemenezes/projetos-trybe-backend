import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Mage extends Archetype {
  private _energyType: EnergyType;
  private static _mageCount = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Mage._mageCount += 1;
  }
                
  public static createdArchetypeInstances(): number {
    return Mage._mageCount;
  }

  public get energyType(): EnergyType {
    return this._energyType;
  }
}