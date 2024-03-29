import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { humblewoodMonsters } from 'src/assets/data/dnd/humblewood-monsters';
import { playerCharacterEntities } from 'src/assets/data/dnd/players';
import { StatblockImageComponent } from '../statblock-image/statblock-image.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SaveEncounterDialogComponent } from '../save-encounter-dialog/save-encounter-dialog.component';

@Component({
  selector: 'o5-dnd-combat-encounter-manager',
  templateUrl: './dnd-combat-encounter-manager.component.html',
  styleUrls: ['./dnd-combat-encounter-manager.component.scss']
})
export class DndCombatEncounterManagerComponent {
  playerCharacters: Array<CombatEntity> = [];
  monsters: Array<CombatEntity> = [];
  initiativeOrder: Array<CombatEntity> = [];
  stashedEncounters: Array<CombatManagerStashed> = [];
  combatLog: Array<string> = [];
  showLogs = false;
  humblewoodMonsters = [...humblewoodMonsters];
  playerView = false;
  duplicateMonsterColor = ['red', 'blue', 'green', 'orange', 'purple', 'teal'];
  currentTurnIndex = 0;

  COMBAT_MANAGER_KEY = 'option5-combat-manager';
  STASHED_ENCOUNTERS_KEY = 'option5-combat-manager-stashed';
  onDestroy$ = new Subject<void>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case ('ArrowLeft'):
        this.previousTurn();
        break;
      case ('ArrowRight'):
        this.nextTurn();
        break;
    }
  }

  constructor(
    private dialog: MatDialog,
    private localstorageService: LocalstorageService) {
    this.initialize();
    this.listenToLocalStorageChanges();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  listenToLocalStorageChanges() {
    this.localstorageService.changed$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.initialize();
    })
  }

  initialize() {
    const stash = this.localstorageService.getItem(this.COMBAT_MANAGER_KEY);

    this.stashedEncounters = JSON.parse(this.localstorageService.getItem(this.STASHED_ENCOUNTERS_KEY) || '[]');

    if (!!stash) {
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

    if (monster.hasCurrentTurn) {
      this.nextTurn();
    }

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
      let damageToTempHp: number = diff > tempHps ? tempHps : diff;
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

    this.localstorageService.removeItem(this.COMBAT_MANAGER_KEY);
    this.initialize();
  }

  toggleLogs() {
    this.showLogs = !this.showLogs;
  }

  update() {
    this.updateStashed();
    this.updateInitiativeTracker();
  }

  updateStashed(encounterName?: string) {
    const stash: CombatManagerStashed = {
      monsters: this.monsters || [],
      playerCharacters: this.playerCharacters,
      combatLog: this.combatLog || []
    }

    if (encounterName) {
      const stashedEncounters: Array<CombatManagerStashed> = JSON.parse(this.localstorageService.getItem(this.STASHED_ENCOUNTERS_KEY) || '[]');
      stashedEncounters.push({ ...stash, name: encounterName });
      this.stashedEncounters = stashedEncounters;
      this.localstorageService.setItem(this.STASHED_ENCOUNTERS_KEY, JSON.stringify(stashedEncounters));
    }

    this.localstorageService.setItem(this.COMBAT_MANAGER_KEY, JSON.stringify(stash));
  }

  onFocus(event) {
    event.target.select();
  }

  monsterSelected(event, entity: CombatEntity, index: number) {
    const monster: CombatEntity = this.humblewoodMonsters.find(mon => mon.code === event.value);
    const multipleCopies = this.monsters.filter(mon => mon.monsterType === monster.code);
    const monsterName = `${monster.name}${(multipleCopies.length > 1) ? ` ${this.duplicateMonsterColor[multipleCopies.length - 2]}` : ''}`;

    const rolledInitiative = Math.floor(Math.random() * 20) + 1;

    entity.name = monsterName;
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

  togglePlayerView() {
    this.playerView = !this.playerView;
  }

  duplicate(entity: CombatEntity) {
    const duplicate = { ...entity };
    const multipleCopies = this.monsters.filter(mon => mon.monsterType === duplicate.monsterType);
    const monsterName = `${duplicate.name} ${this.duplicateMonsterColor[multipleCopies.length - 1]}`;

    duplicate.name = monsterName;
    duplicate.hasCurrentTurn = false;
    duplicate.initiative = Math.floor(Math.random() * 20) + 1;
    this.monsters.push(duplicate);
    this.update();
  }

  nextTurn() {
    const currentTurnIndex = this.initiativeOrder.findIndex(ce => ce.hasCurrentTurn);

    if (currentTurnIndex >= 0) {
      this.initiativeOrder[currentTurnIndex].hasCurrentTurn = false;
    } else {
      this.initiativeOrder[0].hasCurrentTurn = true;
      this.update();
      return;
    }

    if (currentTurnIndex >= this.initiativeOrder.length - 1) {
      this.initiativeOrder[0].hasCurrentTurn = true;
    } else {
      this.initiativeOrder[currentTurnIndex + 1].hasCurrentTurn = true;
    }
    this.update();
  }

  previousTurn() {
    const currentTurnIndex = this.initiativeOrder.findIndex(ce => ce.hasCurrentTurn);

    if (currentTurnIndex >= 0) {
      this.initiativeOrder[currentTurnIndex].hasCurrentTurn = false;
    } else {
      this.initiativeOrder[0].hasCurrentTurn = true;
      this.update();
      return;
    }

    if (currentTurnIndex <= 0) {
      this.initiativeOrder[this.initiativeOrder.length - 1].hasCurrentTurn = true;
    } else {
      this.initiativeOrder[currentTurnIndex - 1].hasCurrentTurn = true;
    }
    this.update();
  }

  resetInitiative() {
    this.initiativeOrder.forEach(ce => ce.hasCurrentTurn = false);
    this.initiativeOrder[0].hasCurrentTurn = true;
    this.update();
  }

  openSaveEncounterDialog() {
    this.dialog.open(SaveEncounterDialogComponent).afterClosed().pipe(take(1)).subscribe(name => {
      if (!!name) {
        this.saveEncounter(name);
      }
    })
  }

  saveEncounter(name: string) {
    this.updateStashed(name);
    this.updateInitiativeTracker();
  }

  loadEncounter(encounter: CombatManagerStashed) {
    this.monsters = encounter.monsters;
    this.playerCharacters = encounter.playerCharacters;
    this.combatLog = encounter.combatLog;

    this.update();
  }

  deleteSavedEncounter(event: MouseEvent, index: number) {
    event.stopPropagation();
    event.preventDefault();

    const stashedEncounters: Array<CombatManagerStashed> = JSON.parse(this.localstorageService.getItem(this.STASHED_ENCOUNTERS_KEY) || '[]');
    stashedEncounters.splice(index, 1);
    this.stashedEncounters = stashedEncounters;
    this.localstorageService.setItem(this.STASHED_ENCOUNTERS_KEY, JSON.stringify(stashedEncounters));
  }

  trackInit(index, item) {
    return item.code;
  }
}

interface CombatManagerStashed {
  name?: string;
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
  hasCurrentTurn?: boolean;
  notes?: string;
}
