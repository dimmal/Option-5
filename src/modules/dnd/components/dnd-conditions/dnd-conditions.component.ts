import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AppService } from 'src/modules/app/services/app.service';
import { NavigationService } from 'src/modules/app/services/navigation.service';

@Component({
  selector: 'o5-dnd-conditions',
  templateUrl: './dnd-conditions.component.html',
  styleUrls: ['./dnd-conditions.component.scss']
})
export class DndConditionsComponent {
  conditions = conditionsList;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private app: AppService) {
    this.app.currentPageTitle = 'dnd.conditions.title';
  }

  scrollToCondition(code: string) {
    const condition = this.elementRef.nativeElement.querySelector(`#${code}`);
    condition.scrollIntoView({behavior: "smooth", inline: "nearest"});
    
    this.renderer.addClass(condition, 'condition-selected');

    setTimeout(() => {
      this.renderer.removeClass(condition, 'condition-selected');
    }, 750);
  }
}

interface DungeonsAndDragonsCondition {
  code: string;
  title: string;
  description?: Array<string>;
  rules?: Array<string>;
}

const conditionsList: Array<DungeonsAndDragonsCondition> = [
  {
    code: 'blinded',
    title: 'dnd.conditions.blinded.title',
    rules: ['dnd.conditions.blinded.rule-1', 'dnd.conditions.blinded.rule-2']
  },
  {
    code: 'charmed',
    title: 'dnd.conditions.charmed.title',
    rules: ['dnd.conditions.charmed.rule-1', 'dnd.conditions.charmed.rule-2']
  },
  {
    code: 'deafened',
    title: 'dnd.conditions.deafened.title',
    rules: ['dnd.conditions.deafened.rule-1']
  },
  {
    code: 'frightened',
    title: 'dnd.conditions.frightened.title',
    rules: ['dnd.conditions.frightened.rule-1', 'dnd.conditions.frightened.rule-2']
  },
  {
    code: 'grappled',
    title: 'dnd.conditions.grappled.title',
    rules: ['dnd.conditions.grappled.rule-1', 'dnd.conditions.grappled.rule-2', 'dnd.conditions.grappled.rule-3']
  },
  {
    code: 'incapacitated',
    title: 'dnd.conditions.incapacitated.title',
    rules: ['dnd.conditions.incapacitated.rule-1']
  },
  {
    code: 'invisible',
    title: 'dnd.conditions.invisible.title',
    rules: ['dnd.conditions.invisible.rule-1', 'dnd.conditions.invisible.rule-2']
  },
  {
    code: 'paralyzed',
    title: 'dnd.conditions.paralyzed.title',
    rules: ['dnd.conditions.paralyzed.rule-1', 'dnd.conditions.paralyzed.rule-2', 'dnd.conditions.paralyzed.rule-3', 'dnd.conditions.paralyzed.rule-4']
  },
  {
    code: 'poisoned',
    title: 'dnd.conditions.poisoned.title',
    rules: ['dnd.conditions.poisoned.rule-1']
  },
  {
    code: 'prone',
    title: 'dnd.conditions.prone.title',
    rules: ['dnd.conditions.prone.rule-1', 'dnd.conditions.prone.rule-2', 'dnd.conditions.prone.rule-3']
  },
  {
    code: 'restrained',
    title: 'dnd.conditions.restrained.title',
    rules: ['dnd.conditions.restrained.rule-1', 'dnd.conditions.restrained.rule-2', 'dnd.conditions.restrained.rule-3']
  },
  {
    code: 'unconscious',
    title: 'dnd.conditions.unconscious.title',
    rules: ['dnd.conditions.unconscious.rule-1', 'dnd.conditions.unconscious.rule-2', 'dnd.conditions.unconscious.rule-3', 'dnd.conditions.unconscious.rule-4', 'dnd.conditions.unconscious.rule-5']
  },
  {
    code: 'exhaustion',
    title: 'dnd.conditions.exhaustion.title',
    description: [
      'dnd.conditions.exhaustion.description-1',
      'dnd.conditions.exhaustion.description-2',
      'dnd.conditions.exhaustion.description-3',
      'dnd.conditions.exhaustion.description-4',
      'dnd.conditions.exhaustion.description-5',
      'dnd.conditions.exhaustion.levels'
    ]
  }
]