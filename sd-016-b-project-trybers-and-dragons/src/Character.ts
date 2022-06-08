import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    const dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = (this.race.maxLifePoints / 2);
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._dexterity = this.race.dexterity;
    this._energy = { 
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  public get race(): Race {
    return this._race;
  }

  public get archetype(): Archetype {
    return this._archetype;
  }

  public get defense(): number {
    return this._defense;
  }

  public get lifePoints(): number {
    return this._lifePoints;
  }

  public get strength(): number {
    return this._strength;
  }

  public get maxLifePoints():number {
    return this._maxLifePoints;
  }

  public get dexterity():number {
    return this._dexterity;
  }

  public get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) this._lifePoints -= damage;
    if (this._lifePoints <= 0) this._lifePoints = -1;

    return this._lifePoints;
  }

  public attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  public levelUp(): void {
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);

    this._energy.amount = 10;

    let newMaxLifePoints = this._maxLifePoints + getRandomInt(1, 10);

    if (newMaxLifePoints >= this._race.maxLifePoints) {
      newMaxLifePoints = this._race.maxLifePoints;
    }
    this._maxLifePoints = newMaxLifePoints;
    this._lifePoints = newMaxLifePoints;
  }

  public special(enemy: Fighter): void {
    const luckerNumber = getRandomInt(1, 10);
    const specialDamage = this._strength * luckerNumber;
    enemy.receiveDamage(specialDamage);
  }
}

export default Character;