import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { humblewoodMonsters } from 'src/assets/data/dnd/humblewood-monsters';
import { playerCharacterEntities } from 'src/assets/data/dnd/players';
import { StatblockImageComponent } from '../statblock-image/statblock-image.component';

@Component({
  selector: 'o5-dnd-combat-encounter-manager',
  templateUrl: './dnd-combat-encounter-manager.component.html',
  styleUrls: ['./dnd-combat-encounter-manager.component.scss']
})
export class DndCombatEncounterManagerComponent {
  playerCharacters: Array<CombatEntity> = [];
  monsters: Array<CombatEntity> = [];
  initiativeOrder: Array<CombatEntity> = [];
  combatLog: Array<string> = [];
  showLogs = false;
  humblewoodMonsters = [...humblewoodMonsters];

  COMBAT_MANAGER_KEY = 'option5-combat-manager';

  constructor(private dialog: MatDialog) {
    this.initialize();
  }

  initialize() {
    const stash = localStorage.getItem(this.COMBAT_MANAGER_KEY);

    if(!!stash) {
      const parsedStash: CombatManagerStashed = JSON.parse(stash);
      this.monsters = parsedStash.monsters;
      this.playerCharacters = parsedStash.playerCharacters;
      this.combatLog = parsedStash.combatLog;
    } else {
      this.playerCharacters = playerCharacterEntities;
      this.monsters = [];
      this.combatLog = [];
    }

    this.updateInitiativeTracker();
  }

  addMonster() {
    const newEntity = {
      name: `Monster ${this.monsters.length + 1}`,
      code: `Monster ${this.monsters.length + 1}`,
      currentHPs: null,
      maxHPs: null,
      initiative: 0
    };

    this.monsters.push(newEntity);

    this.combatLog.unshift(`${newEntity.name} added`);
    this.update();
  }

  removeMonster(index: number) {
    const monster = this.monsters[index];

    if (monster.currentHPs > 0) {
      const remove = confirm('This monster is not dead yet. Remove?');
      if (!remove) { return; }

      this.combatLog.unshift(`${monster.name} removed (current hp: ${monster.currentHPs})`);
    } else {
      this.combatLog.unshift(`${monster.name} removed`);
    }

    this.monsters.splice(index, 1);
    this.update();
  }

  updateInitiativeTracker() {
    this.initiativeOrder = [...this.monsters, ...this.playerCharacters].sort((prev, next) => { return prev.initiative > next.initiative ? -1 : 1; });
  }

  hpChange(event, entity: CombatEntity) {
    let newValue = event.target.value;
    let newCurrent: number;
    let diff;

    if (newValue[0] === '+') {
      diff = parseInt(newValue.replace('+', ''));
      newCurrent = Number(entity.currentHPs) + Number(parseInt(diff));

      this.combatLog.unshift(`${entity.name} was healed for ${diff} hps (${entity.currentHPs} -> ${newCurrent})`);
    } else if (newValue[0] === '-') {
      diff = parseInt(newValue.replace('-', ''));
      let tempHps = Number(entity.tempHPs) || 0;
      let damageToTempHp: number = diff > tempHps? tempHps: diff;
      let newCurrentTempHp: number = tempHps - damageToTempHp;

      newCurrent = Number(entity.currentHPs) - Number(diff) + Number(damageToTempHp);
      entity.tempHPs = newCurrentTempHp;

      this.combatLog.unshift(`${entity.name} was damaged for ${diff} hps (${entity.currentHPs} -> ${newCurrent})`);
    } else {
      diff = entity.currentHPs - newValue;
      newCurrent = newValue;

      if (diff < 0) {
        this.combatLog.unshift(`${entity.name} was healed for ${-diff} hps (${entity.currentHPs} -> ${event.target.value})`);
      } else {
        this.combatLog.unshift(`${entity.name} was damaged for ${diff} hps (${entity.currentHPs} -> ${event.target.value})`);
      }
    }

    entity.currentHPs = newCurrent;
    this.update();
  }

  maxHpChange(event, entity: CombatEntity) {
    entity.maxHPs = event.target.value;
    entity.currentHPs = entity.maxHPs;
    this.combatLog.unshift(`${entity.name} max hps set to ${entity.maxHPs}`);

    this.update();
  }

  completeCombat() {
    const complete = confirm('This will complete the combat and remove all monsters!');

    if (!complete) { return; }

    this.combatLog = [];
    this.monsters = [];
    this.update();
    this.showLogs = false;
  }

  restTheParty() {
    const complete = confirm('This will reset all progress!');

    if (!complete) { return; }

    localStorage.removeItem(this.COMBAT_MANAGER_KEY);
    this.initialize();
  }

  toggleLogs() {
    this.showLogs = !this.showLogs;
  }

  update() {
    this.updateStashed();
    this.updateInitiativeTracker();
  }

  updateStashed() {
    const stash: CombatManagerStashed = {
      monsters: this.monsters || [],
      playerCharacters: this.playerCharacters,
      combatLog: this.combatLog || []
    }

    localStorage.setItem(this.COMBAT_MANAGER_KEY, JSON.stringify(stash));
  }

  onFocus(event) {
    event.target.select();
  }

  monsterSelected(event, entity: CombatEntity, index: number) {
    const monster: CombatEntity = this.humblewoodMonsters.find(mon => mon.code === event.value);
    const rolledInitiative = Math.floor(Math.random() * 20) + 1;

    entity.name = `${monster.name} ${index + 1}`;
    entity.maxHPs = monster.maxHPs;
    entity.currentHPs = monster.currentHPs;
    entity.ac = monster.ac;
    entity.monsterType = monster.code;
    entity.initiative = rolledInitiative + Number(monster.initiativeMod || 0);

    this.combatLog.unshift(`${entity.name} rolled initiatve: ${entity.initiative} (${rolledInitiative} + ${monster.initiativeMod || 0})`);
    this.update();
  }

  showStatblock(entity: CombatEntity) {
    if (!entity.monsterType) { return; }

    this.dialog.open(StatblockImageComponent, {
      data: entity.monsterType
    });
  }
}

interface CombatManagerStashed {
  monsters: Array<CombatEntity>;
  playerCharacters: Array<CombatEntity>;
  combatLog: Array<string>;
}

export interface CombatEntity {
  name?: string;
  code?: string;
  maxHPs?: number;
  currentHPs?: number;
  tempHPs?: number;
  initiative?: number;
  ac?: string;
  isPC?: boolean;
  passivePerception?: number;
  passiveInvestigation?: number;
  monsterType?: string;
  initiativeMod?: number;
}
